import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import {
  Avatar,
  Card,
  Divider,
  HFlex,
  IconActive,
  Spacer,
  Text,
  VFlex,
} from "../../../common";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../../../assets";
import { SidebarContext } from "../../../../contexts";
import { ThemeType } from "../../../../styles/theme";
import { ROTATE } from "../../../../assets/icons/Icon.types";
import {
  CoordsProps,
  positionModals,
} from "../../../../helpers/positionModals";
import { OpenSettingsModal } from "../../../settings";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
  const { handleSidebar, sidebar } = useContext(SidebarContext);
  const theme: ThemeType = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsProps>();

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
    const modalHeight = 68;
    setCoords(positionModals(e, modalHeight));
  };

  return (
    <>
      <VFlex>
        <StyledSidebarTop>
          <Card padding="0px">
            <HFlex>
              <Avatar>T</Avatar>
              <Spacer width={theme.spacers.size8} />
              <Text className="overflow">
                This is a really really long name
              </Text>
              <Spacer width={theme.spacers.size4} />
              <IconActive
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
            <IconActive handleClick={handleSidebar}>
              <DoubleChevronIcon
                rotate={!sidebar ? ROTATE.ONEEIGHTY : undefined}
              />
            </IconActive>
          </DoubleChevronIconContainer>
        </StyledSidebarTop>
        <Divider />
      </VFlex>
      {coords ? (
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

export default SidebarTop;
