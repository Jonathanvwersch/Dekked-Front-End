import React from "react";
import styled from "styled-components";

interface StudyModeProgressBarProps {
  percentage?: number;
  cardCount?: number;
  bgColor?: string;
  totalCardCount? : number;
}

const StudyModeProgressBar: React.FC<StudyModeProgressBarProps> = ({cardCount, totalCardCount, percentage, bgColor}) => {
  console.log(percentage, 'hi', bgColor);
  return (
    <ProgressBarDiv>
      <CardCount>{cardCount}/{totalCardCount}</CardCount>
      <ProgressBar>
        <Filler percentage={percentage} bgColor={bgColor} />
      </ProgressBar>
    </ProgressBarDiv>
  )
};


const ProgressBarDiv = styled.div`
  display: flex;
`;

const CardCount = styled.div<StudyModeProgressBarProps>`
`;

const ProgressBar = styled.div<StudyModeProgressBarProps>`
  background-color: #d8d8d8;
  border-radius: 20px;
  position: relative;
  margin-bottom: 15px;
  margin-left: 25px;
  height: 30px;
  width: 840px;
`;

const Filler = styled.div<StudyModeProgressBarProps>`
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ percentage }) => percentage || "0"}%;
  opacity: 0;
  transition: 1s ease 0.3s;
  opacity: 1;
  background: ${({ bgColor }) => bgColor};
`;

export default StudyModeProgressBar;