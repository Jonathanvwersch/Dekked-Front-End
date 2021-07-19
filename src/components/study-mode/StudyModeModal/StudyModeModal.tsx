import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { GeneralModal, H4, Flex, Spacer, ThumbnailCard } from "../../common";
import FreeStudyCard from "../../../assets/images/FreeStudyCard.png";
import SpacedRepetitionCard from "../../../assets/images/SpacedRepetitionCard.png";
import { Params, STUDY_MODE_TYPES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import styled from "styled-components";
import { typeAtom } from "../../../store";
import { useAtom } from "jotai";

interface StudyModeModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyModeModal: React.FC<StudyModeModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const { id } = useParams<Params>();
  const [type] = useAtom(typeAtom);
  const header = <H4>{formatMessage("studyMode.chooseModal.header")}</H4>;

  return (
    <GeneralModal isOpen={isOpen} header={header} handleClose={handleClose}>
      <Flex justifyContent="center">
        <NavLink
          to={`/${type}/${id}/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`}
        >
          <ThumbnailCard
            topText={formatMessage("studyMode.chooseModal.spacedRepetition")}
            bottomText={formatMessage("studyMode.chooseModal.intervalStudying")}
            backgroundImage={SpacedRepetitionCard}
          />
        </NavLink>
        <Spacer width={theme.spacers.size64} />
        <StyledNavLink
          to={`/${type}/${id}/study/${STUDY_MODE_TYPES.FREE_STUDY}/1/`}
        >
          <ThumbnailCard
            topText={formatMessage("studyMode.chooseModal.freeStudy")}
            bottomText={formatMessage("studyMode.chooseModal.linearStudying")}
            backgroundImage={FreeStudyCard}
          />
        </StyledNavLink>
      </Flex>
    </GeneralModal>
  );
};

const StyledNavLink = styled(NavLink)`
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
  &:active {
    box-shadow: none;
  }
`;

export default StudyModeModal;
