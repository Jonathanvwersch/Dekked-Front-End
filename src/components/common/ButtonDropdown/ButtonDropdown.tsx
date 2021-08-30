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

  id?: string;
}

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({
  modal,
  id,
  button,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const theme = useContext(ThemeContext);
  const modalRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<CoordsType>();
  const handleShowModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
    setCoords(positionModals(e, modal.height, modalRef));
  };

  return (
    <>
      <Button
        size={button.size}
        handleClick={handleShowModal}
        buttonStyle={button.style}
        isDisabled={button.isDisabled}
        buttonRef={modalRef}
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
        fakeFocus={true}
        fullHeight={true}
        id={id}
      />
    </>
  );
};

export default React.memo(ButtonDropdown);
