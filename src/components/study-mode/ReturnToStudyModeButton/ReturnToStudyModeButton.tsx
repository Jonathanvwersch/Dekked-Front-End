import React, { useContext } from "react";
import { Button, Divider, Overlay, Spacer } from "../../common";
import { MODAL_TYPE, SIZES } from "../../../shared";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { CloseIcon, ReturnIcon } from "../../../assets";
import { useHistory } from "react-router-dom";
import { LinkedFlashcardContext } from "../../../contexts";
import { usePageSetupHelpers } from "../../../hooks";

interface ReturnToStudyModeButtonProps {
  buttonPosition: number;
  pageWidth: number;
}

const ReturnToStudyModeButton: React.FC<ReturnToStudyModeButtonProps> = ({
  buttonPosition,
  pageWidth,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();
  const buttonWidth = 290;
  const { isLinked, setIsLinked, studyModeUrl } = useContext(
    LinkedFlashcardContext
  );
  const position = (pageWidth - buttonWidth) / 2 + buttonPosition;

  return (
    <Overlay
      isOpen={isLinked}
      handleClose={() => {
        return null;
      }}
      type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
      coords={{ bottom: 64, left: position }}
    >
      <ButtonContainer buttonWidth={buttonWidth}>
        <Button
          size={SIZES.LARGE}
          borderRadius={`${theme.sizes.borderRadius[SIZES.MEDIUM]} 0px 0px ${
            theme.sizes.borderRadius[SIZES.MEDIUM]
          }`}
          handleClick={() => {
            studyModeUrl ? history.push(studyModeUrl) : history.goBack();
            setIsLinked(false);
          }}
          width="80%"
        >
          <ReturnIcon size={SIZES.LARGE} color="white" />
          <Spacer width={theme.spacers.size8} />
          <FormattedMessage id="studyMode.flashcard.returnToStudy" />
        </Button>
        <Divider width="2px" height="auto" />
        <Button
          size={SIZES.LARGE}
          borderRadius={`0px ${theme.sizes.borderRadius[SIZES.MEDIUM]} ${
            theme.sizes.borderRadius[SIZES.MEDIUM]
          } 0px`}
          width="20%"
          handleClick={() => setIsLinked(false)}
          ariaLabel={formatMessage("tooltips.generics.close")}
        >
          <CloseIcon size={SIZES.LARGE} color="white" />
        </Button>
      </ButtonContainer>
    </Overlay>
  );
};

const ButtonContainer = styled.div<{ buttonWidth: number }>`
  display: flex;
  width: ${({ buttonWidth }) => buttonWidth}px;
`;

export default ReturnToStudyModeButton;
