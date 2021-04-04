import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { GeneralModal, H4, HFlex, Spacer, ThumbnailCard } from "../../common";
import FreeStudyCard from "../../../assets/images/FreeStudyCard.png";
import SpacedRepetitionCard from "../../../assets/images/SpacedRepetitionCard.png";
import { Params, STUDY_MODE_TYPES } from "../../../shared";
import { SelectedItemContext } from "../../../contexts";
import { usePageSetupHelpers } from "../../../hooks";
import { useIntl } from "react-intl";

interface StudyModeModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);
  const { id } = useParams<Params>();
  const { type } = useContext(SelectedItemContext);

  const header = <H4>{formatMessage("studyMode.chooseModal.header", intl)}</H4>;

  return (
    <GeneralModal isOpen={isOpen} header={header} handleClose={handleClose}>
      <HFlex justifyContent="center">
        <NavLink
          to={`/${type}/${id}/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`}
        >
          <ThumbnailCard
            topText={formatMessage(
              "studyMode.chooseModal.spacedRepetition",
              intl
            )}
            bottomText={formatMessage(
              "studyMode.chooseModal.intervalStudying",
              intl
            )}
            backgroundImage={SpacedRepetitionCard}
          />
        </NavLink>
        <Spacer width={theme.spacers.size64} />
        <NavLink to={`/${type}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}`}>
          <ThumbnailCard
            topText={formatMessage("studyMode.chooseModal.freeStudy", intl)}
            bottomText={formatMessage(
              "studyMode.chooseModal.linearStudying",
              intl
            )}
            backgroundImage={FreeStudyCard}
          />
        </NavLink>
      </HFlex>
    </GeneralModal>
  );
};

export default StudyModeModal;
