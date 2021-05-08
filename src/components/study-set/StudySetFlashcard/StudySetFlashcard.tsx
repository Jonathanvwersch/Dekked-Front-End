import React from "react";
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
} from "../../common";
import { DeleteIcon } from "../../../assets";
import { StudySetToolbar } from "..";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";

interface StudySetFlashcardProps {
  frontText?: string;
  backText?: string;
  linked?: boolean;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontText,
  backText,
  linked = false,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === "front" ? "Front" : "Back"}
          </Text>
        </CardHeader>
        <Spacer height={theme.spacers.size8} />
        <TextCard
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        ></TextCard>
      </TextCardContainer>
    );
  };

  const toolbar = () => {
    return linked ? (
      <HFlex justifyContent="center">
        <StudySetToolbar toolbarFull={false} />
      </HFlex>
    ) : (
      <HFlex justifyContent="flex-end">
        <IconActive>
          <DeleteIcon />
        </IconActive>
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
            <Button buttonStyle={BUTTON_THEME.PRIMARY}>
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
