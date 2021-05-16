import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Card,
  HFlex,
  Spacer,
  VFlex,
  Text,
  Button,
  IconActive,
  ShadowCard,
  ComponentLoadingSpinner,
} from "../../common";
import { DeleteIcon } from "../../../assets";
import { StudySetToolbar } from "..";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { EditorState } from "draft-js";
import FlashcardNoteTaker from "../../notetaking/FlashcardNoteTaker";

interface StudySetFlashcardProps {
  frontText?: string[];
  backText?: string[];
  linked?: boolean;
  index?: number;
  loading?: boolean;
  saving?: boolean;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontText,
  backText,
  linked = false,
  index,
  loading,
  saving,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === "front"
              ? formatMessage("studySet.flashcards.front")
              : formatMessage("studySet.flashcards.back")}
          </Text>
        </CardHeader>
        <Spacer height={theme.spacers.size8} />
        <TextCard
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          {!linked && loading ? (
            <ComponentLoadingSpinner />
          ) : (
            <FlashcardNoteTaker
              editorState={
                side === "front"
                  ? frontFlashcardEditorState
                  : backFlashcardEditorState
              }
              setEditorState={
                side === "front"
                  ? setFrontFlashcardEditorState
                  : setBackFlashcardEditorState
              }
            />
          )}
        </TextCard>
      </TextCardContainer>
    );
  };

  const toolbar = () => {
    return linked ? (
      <HFlex justifyContent="center">
        <StudySetToolbar
          editorState={frontFlashcardEditorState}
          setEditorState={setFrontFlashcardEditorState}
          toolbarFull={false}
        />
      </HFlex>
    ) : (
      <HFlex justifyContent="space-between">
        <Text>{index}</Text>
        {saving ? (
          <ComponentLoadingSpinner />
        ) : (
          <IconActive>
            <DeleteIcon />
          </IconActive>
        )}
      </HFlex>
    );
  };

  return (
    <ShadowCard
      backgroundColor={theme.colors.secondary}
      padding={theme.spacers.size16}
      borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      zIndex="15"
    >
      <VFlex>
        {toolbar()}
        <Spacer height={theme.spacers.size8} />
        <HFlex justifyContent="space-between" alignItems="stretch">
          {frontAndBack("front")}
          {frontAndBack("back")}
        </HFlex>
        <Spacer height={theme.spacers.size8} />
        {linked ? (
          <HFlex justifyContent="flex-end">
            <Button buttonStyle={BUTTON_THEME.PRIMARY} isLoading={saving}>
              {formatMessage("generics.save")}
            </Button>
          </HFlex>
        ) : null}
      </VFlex>
    </ShadowCard>
  );
};

const TextCardContainer = styled(Card)<StudySetFlashcardProps>`
  max-width: 49%;
  width: 49%;
  position: relative;
`;

const TextCard = styled(Card)<StudySetFlashcardProps>`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  max-height: 200px;
  min-height: ${({ linked }) => (linked ? "150px" : "64px")};
`;

const CardHeader = styled.div`
  width: 100%;
  z-index: 10;
  padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size8}`};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default StudySetFlashcard;
