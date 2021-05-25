import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Button,
  H1,
  H2,
  Flex,
  IconActive,
  ShadowCard,
  Spacer,
  Tooltip,
} from "../../common";
import { HashLink } from "react-router-hash-link";
import {
  FILETREE_TYPES,
  Params,
  SIZES,
  STUDY_MODE_TYPES,
  TAB_TYPE,
} from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { debounce, isEmpty } from "lodash";
import { EditorState } from "draft-js";
import RichEditor from "../../notetaking/Editor/RichEditor";
import { FormattedMessage } from "react-intl";
import Confetti from "../../../assets/images/Confetti.png";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { LinkedFlashcardContext } from "../../../contexts";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
} from "../../notetaking/Editor/Editor.helpers";
import { useFlashcards } from "../../../services/file-structure";

interface StudySetFlashcardProps {
  isFinishedStudying?: boolean;
  flippedState: boolean;
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  studyMode?: STUDY_MODE_TYPES;
  flashcardId?: string;
  ownerId?: string;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
}
const logoIconSize = SIZES.XLARGE;

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flippedState,
  isFinishedStudying,
  flashcardId,
  ownerId,
  isEditable,
  setIsEditable,
}) => {
  const history = useHistory();
  const location = useLocation();
  const theme = useContext(ThemeContext);
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());

  const { id } = useParams<Params>();
  const { saveFlashcard } = useFlashcards();

  // Make call to server to save text blocks
  const handleSave = async (
    frontEditorState: EditorState,
    backEditorState: EditorState,
    flashcardId: string | undefined,
    ownerId: string | undefined
  ) => {
    const { keys: frontKeys, blocks: frontBlocks } =
      createKeysAndBlocks(frontEditorState);
    const { keys: backKeys, blocks: backBlocks } =
      createKeysAndBlocks(backEditorState);
    await saveFlashcard({
      front_blocks: frontBlocks,
      front_draft_keys: frontKeys,
      back_blocks: backBlocks,
      back_draft_keys: backKeys,
      flash_card_id: flashcardId,
      owner_id: ownerId,
    });
  };

  const { setIsLinked, setStudyModeUrl } = useContext(LinkedFlashcardContext);

  // Set front editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks[0] !== null) {
      const frontContent = convertBlocksToContent(frontBlocks);
      setFrontFlashcardEditorState(EditorState.createWithContent(frontContent));
    }
  }, [frontBlocks]);

  // Set back editor state on mount
  useEffect(() => {
    if (backBlocks && !isEmpty(backBlocks) && backBlocks[0] !== null) {
      const backContent = convertBlocksToContent(backBlocks);
      setBackFlashcardEditorState(EditorState.createWithContent(backContent));
    }
  }, [backBlocks]);

  const handleFinishButton = () => {
    history.push(`/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}`);
  };

  const FinalCard = (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
    >
      <H1 textAlign="center">
        <FormattedMessage id="studyMode.flashcard.congratulations" />
      </H1>
      <Spacer height={theme.spacers.size64} />
      <H2 styledAs="h5" fontWeight="normal" textAlign="center">
        <FormattedMessage id="studyMode.flashcard.finish" />
      </H2>
      <Spacer height={theme.spacers.size32} />
      <Button size={SIZES.LARGE} width="200px" handleClick={handleFinishButton}>
        <FormattedMessage id="generics.finish" />
      </Button>
    </Flex>
  );

  return (
    <>
      <Flashcard
        padding={`${theme.spacers.size48} ${theme.spacers.size48}`}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
        height="100%"
        backgroundImage={Confetti}
        isFinishedStudying={isFinishedStudying}
      >
        {!isFinishedStudying ? (
          <RichEditor
            editorState={
              flippedState
                ? frontFlashcardEditorState
                : backFlashcardEditorState
            }
            setEditorState={
              flippedState
                ? setFrontFlashcardEditorState
                : setBackFlashcardEditorState
            }
            isEditable={isEditable}
          />
        ) : (
          FinalCard
        )}
        {blockLink ? (
          <LogoIconContainer
            handleMouseDown={() => {
              setIsLinked(true);
              setStudyModeUrl(location.pathname);
            }}
            fillType={FILL_TYPE.STROKE}
          >
            <HashLink
              smooth
              to={`/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}#${blockLink}-0-0`}
            >
              <Tooltip
                id="LinkedFlashcardLink"
                text="tooltips.studyMode.linkedFlashcard"
                place="top"
              >
                <LogoIcon size={logoIconSize} />
              </Tooltip>
            </HashLink>
          </LogoIconContainer>
        ) : null}
      </Flashcard>
      {!isFinishedStudying ? (
        <StudyModeToolbar
          flashcardId={flashcardId}
          setIsEditable={setIsEditable}
          isEditable={isEditable}
        />
      ) : null}
    </>
  );
};

const Flashcard = styled(ShadowCard)<{
  backgroundImage: string;
  isFinishedStudying?: boolean;
}>`
  overflow-y: auto;
  position: relative;
  z-index: 0;
  background-size: contain;
  background-image: ${({ backgroundImage, isFinishedStudying }) =>
    isFinishedStudying && backgroundImage
      ? `url(${backgroundImage})`
      : undefined};
`;

const LogoIconContainer = styled(IconActive)`
  position: absolute;
  bottom: 16px;
  z-index: 1;
  left: ${({ theme }) =>
    `calc(50% - ${parseInt(theme.sizes.icons[logoIconSize]) / 2}px)`};
`;

export default StudySetFlashcard;
