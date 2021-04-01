import React, { useContext } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { GeneralModal, H4, HFlex, Spacer, ThumbnailCard } from "../../common";
import FreeStudyCard from "../../../assets/images/FreeStudyCard.png";
import SpacedRepetitionCard from "../../../assets/images/SpacedRepetitionCard.png";

interface StudyModeModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const header = <H4>Choose your study mode</H4>;
  const theme = useContext(ThemeContext);
  const { url } = useRouteMatch();

  return (
    <GeneralModal isOpen={isOpen} header={header} handleClose={handleClose}>
      <HFlex justifyContent="center">
        <NavLink to={`${url}/study-mode/space-repetition`}>
          <ThumbnailCard
            topText="Spaced repetition"
            bottomText="Interval studying"
            backgroundImage={SpacedRepetitionCard}
          />
        </NavLink>
        <Spacer width={theme.spacers.size64} />
        <NavLink to={`${url}/study-mode/free-study`}>
          <ThumbnailCard
            topText="Free study"
            bottomText="Linear studying"
            backgroundImage={FreeStudyCard}
          />
        </NavLink>
      </HFlex>
    </GeneralModal>
  );
};

export default StudyModeModal;
