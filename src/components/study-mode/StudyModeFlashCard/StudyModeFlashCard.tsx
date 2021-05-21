import React, { useContext } from "react";
import Card from "../../../components/common/Cards/Card";
import { IconActive } from "../../common";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import styled, { ThemeContext } from "styled-components";
import { ThemeType } from "../../../styles/theme";

interface StudyModeFlashCardProps {
  question: string;
  answer: string;
}

const StudyModeFlashCard: React.FC<StudyModeFlashCardProps> = ({
  question,
  answer
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  return (
    <div className="card-container">
      <Card 
        height="600px"
        width="900px"
        padding="25px"
        border={`1px solid ${theme.colors.grey2}`}
        backgroundColor={theme.colors.backgrounds.pageBackground}>
        <div className="front">{ question }</div>
        <div className="back">{ answer }</div>
        <IconActive fillType={FILL_TYPE.STROKE}>
          <LogoIcon />
        </IconActive>
      </Card>
    </div>
  )
};

export default StudyModeFlashCard;
