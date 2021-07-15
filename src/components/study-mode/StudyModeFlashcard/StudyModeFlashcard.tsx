import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Button,
  H1,
  H2,
  Flex,
  IconActive,
  ShadowCard,
  Spacer,
  Tooltip,
  Text,
} from "../../common";
import { HashLink } from "react-router-hash-link";
import {
  BUTTON_THEME,
  FILETREE_TYPES,
  Params,
  SIZES,
  STUDY_MODE_TYPES,
  TAB_TYPE,
} from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { isEmpty } from "lodash";
import { EditorState } from "draft-js";
import RichEditor from "../../notetaking/Editor/RichEditor";
import { FormattedMessage } from "react-intl";
import Confetti from "../../../assets/images/Confetti.png";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { convertBlocksToContent } from "../../notetaking/Editor/Editor.helpers";
import { usePageSetupHelpers } from "../../../hooks";
import {
  blockLinkAtom,
  isFlashcardLinkedAtom,
  selectStudySetTab,
  studyModeUrlAtom,
} from "../../../store";
import { useAtom } from "jotai";

interface StudyModeFlashcardProps {
  flippedState: boolean;
  isFinishedStudying?: boolean;
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  studyMode?: STUDY_MODE_TYPES;
  flashcardId?: string;
  ownerId?: string;
}
const logoIconSize = SIZES.XLARGE;

const StudyModeFlashcard: React.FC<StudyModeFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flippedState,
  isFinishedStudying,
  flashcardId,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const { id } = useParams<Params>();
  const [, setIsLinked] = useAtom(isFlashcardLinkedAtom);
  const [, setStudyModeUrl] = useAtom(studyModeUrlAtom);
  const [, setBlockLink] = useAtom(blockLinkAtom);
  const [studySetTab] = useAtom(useMemo(() => selectStudySetTab(id), [id]));
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

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
      <H2 styledAs="h5" fontWeight="normal" textAlign="center">
        <FormattedMessage id="studyMode.flashcard.continueStudying" />
      </H2>
      <Spacer height={theme.spacers.size32} />
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Button
          size={SIZES.LARGE}
          width="200px"
          handleClick={() => {
            history.push(`/${FILETREE_TYPES.STUDY_SET}/${id}/${studySetTab}`);
          }}
        >
          <FormattedMessage id="generics.finish" />
        </Button>
        <Spacer width={theme.spacers.size16} />
        <Button
          size={SIZES.LARGE}
          width="200px"
          handleClick={() => {
            history.push(
              `/${FILETREE_TYPES.STUDY_SET}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}/1`
            );
          }}
          buttonStyle={BUTTON_THEME.SECONDARY}
        >
          <FormattedMessage id="studyMode.chooseModal.freeStudy" />
        </Button>
      </Flex>
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
          <CardHeader>
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size16}
            >
              {flippedState
                ? formatMessage("studySet.flashcards.front")
                : formatMessage("studySet.flashcards.back")}
            </Text>
          </CardHeader>
        ) : null}
        {!isFinishedStudying ? (
          <RichEditor
            hasFocus={hasFocus}
            setHasFocus={setHasFocus}
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
              setBlockLink(blockLink);
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
          currentBlockKey={blockLink}
          frontBlocks={frontBlocks}
          backBlocks={backBlocks}
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

const CardHeader = styled.div`
  top: ${({ theme }) => theme.spacers.size16};
  left: ${({ theme }) => theme.spacers.size16};
  position: absolute;
`;

export default StudyModeFlashcard;
