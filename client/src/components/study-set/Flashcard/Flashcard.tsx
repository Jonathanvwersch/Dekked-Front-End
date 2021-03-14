import React, { useContext } from "react";
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
      <VFlex>
        <Card
          backgroundColor={theme.colors.backgrounds.pageBackground}
          padding="4px 8px"
          borderRadius={theme.display.borderRadiusFive}
        >
          <StyledText fontColor={theme.colors.grey2}>
            {side === "front" ? "Front" : "Back"}
          </StyledText>
        </Card>
        <StyledCard
          linked={linked}
          padding="0px 16px 8px 16px"
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          <VFlex alignItems="flex-start">
            <Spacer height="8px" />
            <Text> {side === "front" ? frontText : backText}</Text>
            <VFlex></VFlex>
          </VFlex>
        </StyledCard>
      </VFlex>
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
        <HFlex>
          {frontAndBack("front")}
          <Spacer width="16px" />
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

const StyledCard = styled(Card)<FlashcardProps>`
  max-height: 198px;
  min-height: ${({ linked }) => (linked ? "150px" : "40px")};
  position: relative;
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
`;

const StyledText = styled(Text)``;

export default Flashcard;
