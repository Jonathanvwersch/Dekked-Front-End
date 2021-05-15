import React, { useContext, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import {
  Avatar,
  Card,
  Divider,
  HFlex,
  IconActive,
  Spacer,
  Text,
  Tooltip,
  VFlex,
} from "../../../common";
import {
  DoubleChevronIcon,
  DropDownArrowIcon,
  ROTATE,
} from "../../../../assets";
import { ThemeType } from "../../../../styles/theme";
import { positionModals } from "../../../../helpers";
import { OpenSettingsModal } from "../../../settings";
import { CoordsType } from "../../../../shared";

interface SidebarTopProps {
  isSidebarOpen: boolean;
  handleSidebar?: () => void;
}

const SidebarTop: React.FC<SidebarTopProps> = ({
  isSidebarOpen,
  handleSidebar,
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const settingsRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
    const modalHeight = 68;
    setCoords(positionModals(e, modalHeight, settingsRef));
  };

  const ariaText = !isSidebarOpen
    ? "tooltips.sidebar.openSidebar"
    : "tooltips.sidebar.closeSidebar";

  console.log("top");

  return (
    <>
      <VFlex>
        <StyledSidebarTop>
          <Card padding="0px">
            <HFlex>
              <Avatar>T</Avatar>
              <Spacer width={theme.spacers.size8} />
              <Text className="overflow">Toby Corner</Text>
              <Spacer width={theme.spacers.size4} />
              <IconActive
                iconActiveRef={settingsRef}
                handleClick={(
                  e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ) => handleOpenModal(e)}
              >
                <DropDownArrowIcon rotate={ROTATE.NINETY} />
              </IconActive>
              <Spacer width={theme.spacers.size32} />
            </HFlex>
          </Card>

          <DoubleChevronIconContainer>
            <IconActive handleClick={handleSidebar} ariaLabel={ariaText}>
              <Tooltip id="CloseSidebar" text={ariaText}>
                <DoubleChevronIcon
                  rotate={!isSidebarOpen ? ROTATE.ONEEIGHTY : undefined}
                />
              </Tooltip>
            </IconActive>
          </DoubleChevronIconContainer>
        </StyledSidebarTop>
        <Divider />
      </VFlex>
      {coords && openModal ? (
        <OpenSettingsModal
          open={openModal}
          coords={coords}
          handleClose={() => setOpenModal(false)}
        />
      ) : null}
    </>
  );
};

const StyledSidebarTop = styled(VFlex)`
  position: relative;
  padding: ${({ theme }) => theme.spacers.size16};
`;

const DoubleChevronIconContainer = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacers.size16};
  top: ${({ theme }) => theme.spacers.size24};
`;

export default React.memo(SidebarTop);
