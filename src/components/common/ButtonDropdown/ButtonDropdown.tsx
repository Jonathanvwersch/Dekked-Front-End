import React, { useContext, useRef, useState } from "react";
import { ScrollerModal } from "..";
import {
  Button,
  DropDownArrowIcon,
  ROTATE,
  Spacer,
} from "dekked-design-system";

import {
  BUTTON_THEME,
  CoordsType,
  ScrollerModalData,
  SIZES,
} from "../../../shared";

import { positionModals } from "../../../helpers";
import { ThemeContext } from "styled-components";

interface ButtonDropdownProps {
  modal: {
    data: ScrollerModalData;
    clickFunctions: (args: any) => void;
    height?: number;
  };
  button: {
    style?: BUTTON_THEME;
    text?: string;
    size?: SIZES;
    isDisabled?: boolean;
  };
  flushWithRightButtonSide?: boolean;
  id?: string;
}

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({
  modal,
  id,
  button,
  flushWithRightButtonSide,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme = useContext(ThemeContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<CoordsType>();
  const handleShowModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
    const buttonWidth = buttonRef?.current?.clientWidth || 0;

    flushWithRightButtonSide
      ? setCoords({
          ...positionModals(e, modal.height, buttonRef),
          left:
            positionModals(e, modal.height, buttonRef)?.left -
            (Number(theme.sizes.modal.small.slice(0, -2)) - buttonWidth),
        })
      : setCoords(positionModals(e, modal.height, buttonRef));
  };

  return (
    <>
      <Button
        size={button.size}
        handleClick={handleShowModal}
        buttonStyle={button.style}
        isDisabled={button.isDisabled}
        buttonRef={buttonRef}
      >
        {button.text}
        <Spacer width={theme.spacers.size8} />
        <DropDownArrowIcon
          rotate={ROTATE.NINETY}
          color="white"
          size={SIZES.MEDIUM}
        />
      </Button>
      <ScrollerModal
        coords={coords}
        clickFunctions={modal.clickFunctions}
        open={showModal}
        handleClose={() => setShowModal(false)}
        data={modal.data}
        cardRef={modalRef}
        preventDefault
        fakeFocus={true}
        fullHeight={true}
        id={id}
      />
    </>
  );
};

export default React.memo(ButtonDropdown);
