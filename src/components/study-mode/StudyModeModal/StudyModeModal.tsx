import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { GeneralModal, H4, HFlex, Spacer, ThumbnailCard } from "../../common";
import FreeStudyCard from "../../../assets/images/FreeStudyCard.png";
import SpacedRepetitionCard from "../../../assets/images/SpacedRepetitionCard.png";
import { Params, STUDY_MODE_TYPES } from "../../../shared";
import { SelectedItemContext } from "../../../contexts";

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
  const { id } = useParams<Params>();
  const { type } = useContext(SelectedItemContext);
  return (
    <GeneralModal isOpen={isOpen} header={header} handleClose={handleClose}>
      <HFlex justifyContent="center">
        <NavLink
          to={`/${type}/${id}/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`}
        >
          <ThumbnailCard
            topText="Spaced repetition"
            bottomText="Interval studying"
            backgroundImage={SpacedRepetitionCard}
          />
        </NavLink>
        <Spacer width={theme.spacers.size64} />
        <NavLink to={`/${type}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}`}>
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
