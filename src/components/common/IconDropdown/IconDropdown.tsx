import React, { ReactElement, useRef, useState } from "react";
import { ScrollerModal, Tooltip } from "..";
import { Flex, IconActive, IconWrapper } from "dekked-design-system";
import { DropDownArrowIcon, ROTATE } from "dekked-design-system";

import { CoordsType, ScrollerModalData, SIZES } from "../../../shared";

import { positionModals } from "../../../helpers";

interface IconDropdownProps {
  modal: {
    height: number;
    data: ScrollerModalData;
    clickFunctions: (args: any) => void;
  };
  tooltip: {
    id?: string;
    text?: string;
  };
  icon: {
    icon: ReactElement;
    size?: SIZES;
    isDisabled?: boolean;
  };
  id?: string;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  tooltip,
  icon,
  modal,
  id,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
      <IconWrapper>
        <IconActive
          isDisabled={icon.isDisabled}
          iconActiveRef={modalRef}
          handleMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleShowModal(e)
          }
        >
          <Tooltip
            id={tooltip.id || ""}
            text={tooltip.text || ""}
            isActive={Boolean(tooltip.id) && Boolean(tooltip.text)}
          >
            <Flex>
              {icon.icon}
              <DropDownArrowIcon size={icon.size} rotate={ROTATE.NINETY} />
            </Flex>
          </Tooltip>
        </IconActive>
      </IconWrapper>
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

export default React.memo(IconDropdown);
