import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { theme } from "../../../styles/theme";
import { Box, Flex, Spacer, Text } from "../../common";

interface StudyModeToolbarProps {
  flashcardIndex: number;
  flashcardTotal: number;
}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = ({
  flashcardIndex,
  flashcardTotal,
}) => {
  const theme = useContext(ThemeContext);
  const percentageComplete =
    (Number(flashcardIndex + 1) / Number(flashcardTotal)) * 100;

  return (
    <Flex mb={theme.spacers.size32}>
      {flashcardIndex + 1 > flashcardTotal ? null : (
        <>
          <Text fontSize={theme.typography.fontSizes.size16}>{`${
            flashcardIndex + 1
          }/${flashcardTotal}`}</Text>
          <Spacer width={theme.spacers.size16} />
        </>
      )}
      <ProgressBar>
        <Filler
          percentageComplete={
            percentageComplete > 100 ? 100 : percentageComplete
          }
          bgColor={
            flashcardIndex + 1 > flashcardTotal
              ? theme.colors.success
              : undefined
          }
        />
      </ProgressBar>
    </Flex>
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
