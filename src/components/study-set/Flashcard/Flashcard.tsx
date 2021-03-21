import React, { useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Card,
  HFlex,
  Spacer,
  VFlex,
  Text,
  Button,
  IconActive,
} from "../../common";
import { DeleteIcon } from "../../../assets";
import { ThemeType } from "../../../styles/theme";
import { Toolbar } from "..";
import { BUTTON_THEME } from "../../common/Button/Button";
import NoteTaker from "../../notetaking/NoteTaker";

interface FlashcardProps {
  frontText?: string;
  backText?: string;
  linked?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  frontText,
  backText,
  linked = false,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.display.borderRadiusFive}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === "front" ? "Front" : "Back"}
          </Text>
        </CardHeader>
        <Spacer height="8px" />
        <TextCard
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          <NoteTaker />
        </TextCard>
      </TextCardContainer>
    );
  };

  const toolbar = () => {
    return linked ? (
      <HFlex justifyContent="flex-start">
        <Toolbar toolbarFull={false} />
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
    <Card borderRadius={theme.display.borderRadiusFive}>
      <VFlex>
        {toolbar()}
        <Spacer height="8px" />
        <HFlex justifyContent="space-between" alignItems="stretch">
          {frontAndBack("front")}
          {frontAndBack("back")}
        </HFlex>
        <Spacer height="8px" />
        {linked ? (
          <HFlex justifyContent="flex-end">
            <Button buttonStyle={BUTTON_THEME.PRIMARY}>Save</Button>
          </HFlex>
        ) : null}
      </VFlex>
    </Card>
  );
};

const TextCardContainer = styled(Card)<FlashcardProps>`
  max-width: 49%;
  width: 49%;
  position: relative;
`;

const TextCard = styled(Card)<FlashcardProps>`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  max-height: 198px;
  min-height: ${({ linked }) => (linked ? "150px" : "60px")};
`;

const CardHeader = styled.div`
  width: 100%;
  z-index: 10;
  padding: 4px 8px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default Flashcard;