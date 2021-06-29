import React from "react";
import { Button, Divider, Flex, Overlay, Spacer } from "../../common";
import {
  FILETREE_TYPES,
  MODAL_TYPE,
  Params,
  SIZES,
  TAB_TYPE,
} from "../../../shared";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { CloseIcon, ReturnIcon } from "../../../assets";
import { useHistory, useParams } from "react-router-dom";
import { useKeyPress, usePageSetupHelpers } from "../../../hooks";
import { isFlashcardLinkedAtom, studyModeUrlAtom } from "../../../store";
import { useAtom } from "jotai";

interface ReturnToStudyModeButtonProps {}

const ReturnToStudyModeButton: React.FC<ReturnToStudyModeButtonProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const history = useHistory();
  const { id } = useParams<Params>();
  const buttonWidth = 290;
  const [isLinked, setIsLinked] = useAtom(isFlashcardLinkedAtom);
  const [studyModeUrl] = useAtom(studyModeUrlAtom);

  useKeyPress(["Escape"], () => setIsLinked(false));

  return (
    <Overlay
      isOpen={isLinked}
      handleClose={() => {
        return null;
      }}
      type={MODAL_TYPE.NON_MODAL_NON_LIGHTBOX}
      coords={{ bottom: 64 }}
      modalWidth="100vw"
    >
      <Flex width="100vw" justifyContent="center">
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
            handleClick={() => {
              setIsLinked(false);
              history.push(
                `/${FILETREE_TYPES.STUDY_SET}/${id}/${TAB_TYPE.NOTES}`
              );
            }}
            ariaLabel={formatMessage("tooltips.generics.close")}
          >
            <CloseIcon size={SIZES.LARGE} color="white" />
          </Button>
        </ButtonContainer>
      </Flex>
    </Overlay>
  );
};

const ButtonContainer = styled.div<{ buttonWidth: number }>`
  display: flex;
  width: ${({ buttonWidth }) => buttonWidth}px;
`;

export default ReturnToStudyModeButton;
