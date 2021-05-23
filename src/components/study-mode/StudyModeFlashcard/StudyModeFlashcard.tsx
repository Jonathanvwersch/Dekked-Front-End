import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import {
  Button,
  H1,
  H2,
  HFlex,
  IconActive,
  ShadowCard,
  Spacer,
  Tooltip,
  VFlex,
} from "../../common";
import { HashLink } from "react-router-hash-link";
import { FILETREE_TYPES, Params, SIZES, TAB_TYPE } from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { isEmpty } from "lodash";
import { convertFromRaw, EditorState, RawDraftContentBlock } from "draft-js";
import RichEditor from "../../notetaking/Editor/RichEditor";
import { FormattedMessage } from "react-intl";
import Confetti from "../../../assets/images/Confetti.png";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { LinkedFlashcardContext } from "../../../contexts";

interface StudySetFlashcardProps {
  isFinishedStudying?: boolean;
  flippedState: boolean;
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flippedState,
  isFinishedStudying,
}) => {
  const history = useHistory();
  const location = useLocation();
  const theme = useContext(ThemeContext);
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const { id } = useParams<Params>();
  const { setIsLinked, setStudyModeUrl } = useContext(LinkedFlashcardContext);

  // Set editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks[0] !== null) {
      const parsedBlocks: RawDraftContentBlock[] = frontBlocks.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontBlocks]);

  // Set editor state on mount
  useEffect(() => {
    if (backBlocks && !isEmpty(backBlocks) && backBlocks[0] !== null) {
      const parsedBlocks: RawDraftContentBlock[] = backBlocks.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setBackFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [backBlocks]);

  const handleFinishButton = () => {
    history.push(`/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}`);
  };

  return (
    <>
      <FlashcardContainer>
        <Flashcard
          padding={`${theme.spacers.size48} ${theme.spacers.size48}`}
          borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
          height="600px"
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
              isEditable={false}
            />
          ) : (
            <VFlex width="100%" height="100%" justifyContent="center">
              <H1 textAlign="center">
                <FormattedMessage id="studyMode.flashcard.congratulations" />
              </H1>
              <Spacer height={theme.spacers.size64} />
              <H2 styledAs="h5" fontWeight="normal" textAlign="center">
                <FormattedMessage id="studyMode.flashcard.finish" />
              </H2>
              <Spacer height={theme.spacers.size32} />
              <Button
                size={SIZES.LARGE}
                width="200px"
                handleClick={handleFinishButton}
              >
                <FormattedMessage id="generics.finish" />
              </Button>
            </VFlex>
          )}
        </Flashcard>
        <LogoIconContainer
          handleMouseDown={() => {
            setIsLinked(true);
            setStudyModeUrl(location.pathname);
          }}
          fillType={FILL_TYPE.STROKE}
        >
          <HashLink
            smooth
            to={`/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}#48vnc-0-0`}
          >
            <Tooltip
              id="LinkedFlashcardLink"
              text="tooltips.studyMode.linkedFlashcard"
              place="top"
            >
              <LogoIcon size={SIZES.LARGE} />
            </Tooltip>
          </HashLink>
        </LogoIconContainer>
        <StudyModeToolbar />
      </FlashcardContainer>
    </>
  );
};

const Flashcard = styled(ShadowCard)<{
  backgroundImage: string;
  isFinishedStudying?: boolean;
}>`
  z-index: 0;
  background-size: contain;
  background-image: ${({ backgroundImage, isFinishedStudying }) =>
    isFinishedStudying && backgroundImage
      ? `url(${backgroundImage})`
      : undefined};
`;

const FlashcardContainer = styled(HFlex)`
  justify-content: center;
  position: relative;
`;

const LogoIconContainer = styled(IconActive)`
  position: absolute;
  bottom: 16px;
  z-index: 1;
`;

export default StudySetFlashcard;
