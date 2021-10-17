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
  Text,
  LogoIcon,
  FILL_TYPE,
} from "dekked-design-system";
import { HashLink } from "react-router-hash-link";
import {
  BUTTON_THEME,
  FILETREE_TYPES,
  FlashcardLearningStatus,
  Params,
  SIZES,
  STUDY_MODE_TYPES,
  TAB_TYPE,
} from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { isEmpty } from "lodash";
import { EditorState } from "draft-js";
import RichEditor from "../../notetaking/Editor/RichEditor";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { convertBlocksToContent } from "../../notetaking/Editor/Editor.helpers";
import { usePageSetupHelpers } from "../../../hooks";
import {
  blockLinkAtom,
  isFlashcardLinkedAtom,
  selectStudySetTab,
  currentFlashcardIndexAtom,
  fullscreenStudyModeAtom,
} from "../../../store";
import { useAtom } from "jotai";
import { Tooltip } from "../../common";

interface StudyModeFlashcardProps {
  flippedState?: boolean;
  isFinishedStudying?: boolean;
  frontBlocks?: string[];
  backBlocks?: string[];
  blockLink?: string;
  studyMode?: STUDY_MODE_TYPES;
  flashcardId?: string;
  ownerId?: string;
  flashcardIndex?: number;
  learningStatus?: FlashcardLearningStatus;
  setFlashcardIndex?: React.Dispatch<React.SetStateAction<number>>;
  isFlashcardsEmpty?: boolean;
}
const logoIconSize = SIZES.MEDIUM;

const StudyModeFlashcard: React.FC<StudyModeFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  blockLink,
  flippedState,
  isFinishedStudying,
  flashcardId,
  learningStatus,
  studyMode,
  setFlashcardIndex,
  isFlashcardsEmpty,
  flashcardIndex,
}) => {
  const [fullscreen] = useAtom(fullscreenStudyModeAtom);
  const flashcardMaxHeight = fullscreen ? "80%" : "400px";
  const history = useHistory();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const { id, type } = useParams<Params>();
  const [deletedLastFlashcard, setDeletedLastFlashcard] =
    useState<boolean>(false);
  const [, setIsLinked] = useAtom(isFlashcardLinkedAtom);
  const [, setCurrentFlashcardIndex] = useAtom(currentFlashcardIndexAtom);
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

  const returnToTextId =
    type === FILETREE_TYPES.FOLDER
      ? "returnToFolder"
      : type === FILETREE_TYPES.BINDER
      ? "returnToBinder"
      : "returnToStudySet";

  const emptyDeckTextId =
    type === FILETREE_TYPES.STUDY_SET
      ? "clickReturnToStudySet"
      : "goToStudySet";

  const FinalCard = (
    <Flex flexDirection="column" width="100%" justifyContent="center" m="auto">
      {isFlashcardsEmpty || deletedLastFlashcard ? null : (
        <H1 textAlign="center" styledAs="h2">
          <FormattedMessage id="studyMode.flashcard.congratulations" />
        </H1>
      )}
      <H2 styledAs="h4">
        <FormattedMessage
          id={
            isFlashcardsEmpty || deletedLastFlashcard
              ? "studyMode.flashcard.flashcardsEmpty"
              : studyMode === STUDY_MODE_TYPES.FREE_STUDY
              ? "studyMode.flashcard.reachedTheEnd"
              : "studyMode.flashcard.caughtUp"
          }
        />
      </H2>
      <Spacer height={theme.spacers.size48} />
      {isFlashcardsEmpty || deletedLastFlashcard ? (
        <H2 styledAs="h5" fontWeight="normal" textAlign="center">
          <FormattedMessage id={`studyMode.flashcard.${emptyDeckTextId}`} />
        </H2>
      ) : (
        <>
          <H2 styledAs="h5" fontWeight="normal" textAlign="center">
            <FormattedMessage id="studyMode.flashcard.finish" />
          </H2>
          <H2 styledAs="h5" fontWeight="normal" textAlign="center">
            <FormattedMessage id="studyMode.flashcard.continueStudying" />
          </H2>
        </>
      )}
      <Spacer height={theme.spacers.size32} />
      {isFlashcardsEmpty || deletedLastFlashcard ? (
        <Button
          size={SIZES.LARGE}
          width="200px"
          handleClick={() => {
            type === FILETREE_TYPES.STUDY_SET
              ? history.push(
                  `/${type}/${id}/${studySetTab || TAB_TYPE.FLASHCARDS}`
                )
              : history.push(`/${type}/${id}`);
          }}
        >
          <FormattedMessage id={`studyMode.flashcard.${returnToTextId}`} />
        </Button>
      ) : (
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <Button
            size={SIZES.LARGE}
            width="200px"
            handleClick={() => {
              type === FILETREE_TYPES.STUDY_SET
                ? history.push(`/${type}/${id}/${TAB_TYPE.FLASHCARDS}`)
                : history.push(`/${type}/${id}`);
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
                `/${FILETREE_TYPES.STUDY_SET}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}`
              );
              setFlashcardIndex && setFlashcardIndex(0);
            }}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            <FormattedMessage id="studyMode.types.freeStudy" />
          </Button>
        </Flex>
      )}
    </Flex>
  );

  return (
    <Flex height="100%" maxHeight={flashcardMaxHeight}>
      <Flashcard
        padding={`0 0 ${isFinishedStudying ? 0 : theme.spacers.size48} 0`}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
        height="100%"
        isFinishedStudying={isFinishedStudying}
        learningStatus={learningStatus}
        studyMode={studyMode}
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
            styles={{
              padding: `0 ${theme.spacers.size32} 0 ${theme.spacers.size32}`,
              overflow: "auto",
            }}
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
              setCurrentFlashcardIndex(flashcardIndex || 0);
              setBlockLink(blockLink);
            }}
            fillType={FILL_TYPE.FILL}
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
          setDeletedLastFlashcard={setDeletedLastFlashcard}
          studyMode={studyMode}
          currentBlockKey={blockLink}
          frontBlocks={frontBlocks}
          backBlocks={backBlocks}
        />
      ) : null}
    </Flex>
  );
};

const Flashcard = styled(ShadowCard)<{
  isFinishedStudying?: boolean;
  learningStatus?: FlashcardLearningStatus;
  studyMode?: STUDY_MODE_TYPES;
}>`
  overflow-y: auto;
  position: relative;
  z-index: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  border: ${({ theme, learningStatus, studyMode }) =>
    studyMode === STUDY_MODE_TYPES.SPACED_REPETITION &&
    `2px solid ${
      learningStatus === FlashcardLearningStatus.NEW
        ? theme.colors.success
        : learningStatus === FlashcardLearningStatus.LEARNING
        ? theme.colors.primary
        : learningStatus === FlashcardLearningStatus.LEARNED ||
          learningStatus === FlashcardLearningStatus.DUE
        ? theme.colors.danger
        : "transparent"
    }`};
`;

const LogoIconContainer = styled(IconActive)`
  position: absolute;
  bottom: 12px;
  z-index: 1;
  left: ${({ theme }) =>
    `calc(50% - ${parseInt(theme.sizes.icons[logoIconSize]) / 2}px)`};
`;

const CardHeader = styled.div`
  user-select: none;
  width: 100%;
  z-index: 1000;
  display: flex;
  height: ${({ theme }) => theme.spacers.size32};
  align-items: center;
  padding: ${({ theme }) => theme.spacers.size16};
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default StudyModeFlashcard;
