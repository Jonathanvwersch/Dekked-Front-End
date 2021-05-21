import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudyModeProgressBar from "../StudyModeProgressBar/StudyModeProgressBar";
import { SingleChevronIcon, FlipIcon } from "../../../assets";
import { IconActive } from "../../common";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import StudyModeFlashCard from "../StudyModeFlashCard/StudyModeFlashCard";

interface StudyModeSpacedRepetitionProps {}

interface FlashCardProps {
  question?: string;
  answer?: string;
}

const StudyModeSpacedRepetition: React.FC<StudyModeSpacedRepetitionProps> = () => {
 const [totalCardCount, setTotalCardCount] = useState<number>(0);
 const [percentage, setPercentage] = useState<number>(0);
 const [cardCount, setCardCount] = useState<number>(1)
 const [cards, setCards] = useState<Array<object>>([ { question: "What is your name", answer: "Sophie"}, { question: "What is your age", answer: "25"}, { question: "What is your eye colour", answer: "Brown"} ])
 const [currentCard, setCurrentCard] = useState<FlashCardProps>({});

 const incrementCardCount = () => {
   if (cardCount < totalCardCount) {
      setCardCount(cardCount + 1);
      const currentCards = cards;
      setCurrentCard(getRandomCard(currentCards))
   }

   return;
}

const decrementCardCount = () => {
  if (cardCount > 1) {
    return setCardCount(cardCount - 1);
  }

  return;
}

const flipCard = () => {
  console.log('hello');
}

const getRandomCard = (currentCards: Array<object>): object => {
  const card = currentCards[Math.floor(Math.random() * currentCards.length)];
  return card;
}

 useEffect(() => {
  setPercentage((cardCount/totalCardCount) * 100)
 }, [cardCount])

 useEffect(() => {
  const currentCards = cards;
  setCards(currentCards);
  const randomCard = getRandomCard(currentCards);
  setCurrentCard(randomCard);
  setTotalCardCount(cards.length);
 }, [])

  return (
    <> 
      <StudyModeProgressBar 
        bgColor="#00B6EC"
        cardCount={cardCount}
        percentage={percentage}
        totalCardCount={totalCardCount} />
      <StudyModeFlashCard question={ currentCard.question! } answer={ currentCard.answer! } />
      <ControlIconsDiv>
        <IconActive fillType={FILL_TYPE.STROKE} handleClick={() => decrementCardCount()}>
          <SingleChevronIcon />
        </IconActive>
        <IconActive fillType={FILL_TYPE.STROKE}>
        <IconActive fillType={FILL_TYPE.STROKE} handleClick={() => flipCard()}>
         <FlipIcon />
        </IconActive>
      </IconActive>   
        <IconActive fillType={FILL_TYPE.STROKE} handleClick={() => incrementCardCount()}>
          <SingleChevronIcon />
        </IconActive>
      </ControlIconsDiv>
    </>
  );
};

const ControlIconsDiv = styled.div`
  display: flex;
  margin-top: 10px;
  float: center;
  text-align: center
`;

export default StudyModeSpacedRepetition;
