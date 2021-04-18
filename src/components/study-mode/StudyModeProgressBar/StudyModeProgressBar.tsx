import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { theme } from "../../../styles/theme";
import { HFlex, Spacer, Text } from "../../common";

interface StudyModeToolbarProps {}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = () => {
  const theme = useContext(ThemeContext);
  const flashcardIndex = "1";
  const flashcardTotal = "3";
  const percentageComplete =
    (Number(flashcardIndex) / Number(flashcardTotal)) * 100;

  return (
    <HFlex>
      <Text
        fontSize={theme.typography.fontSizes.size16}
      >{`${flashcardIndex}/${flashcardTotal}`}</Text>
      <Spacer width={theme.spacers.size16} />
      <ProgressBar>
        <Filler percentageComplete={percentageComplete} bgColor={undefined} />
      </ProgressBar>
    </HFlex>
  );
};

const ProgressBar = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacers.size24};
  border-radius: ${({ theme }) => theme.spacers.size24};
  background-color: ${({ theme }) => theme.colors.grey3};
`;

const Filler = styled.div<{ percentageComplete: number; bgColor?: string }>`
  width: ${({ percentageComplete }) => percentageComplete}%;
  height: 100%;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : theme.colors.primary};
  border-radius: inherit;
`;

export default StudyModeToolbar;
