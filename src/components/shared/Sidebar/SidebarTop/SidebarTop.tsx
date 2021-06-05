import React, { useContext, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Avatar,
  Card,
  IconActive,
  Spacer,
  Text,
  Tooltip,
  Flex,
} from "../../../common";
import {
  DoubleChevronIcon,
  DropDownArrowIcon,
  ROTATE,
} from "../../../../assets";
import { ThemeType } from "../../../../styles/theme";
import { positionModals } from "../../../../helpers";
import { OpenSettingsModal } from "../../../settings";
import { CoordsType, UserType } from "../../../../shared";
import { useQuery } from "react-query";
import { getUser } from "../../../../services/authentication/getUser";
import { UserContext } from "../../../../contexts";

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
  const { user } = useContext(UserContext);
  const { data } = useQuery<UserType>(user.id, getUser, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const firstName = data?.first_name || "";
  const lastName = data?.last_name || "";
  const fullName = `${firstName} ${lastName}`;
  const firstLetterOfFirstName = firstName?.[0] || "";

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

  return (
    <>
      <StyledSidebarTop p={theme.spacers.size16}>
        <Card padding="0px">
          <Flex>
            <Avatar>{firstLetterOfFirstName}</Avatar>
            <Spacer width={theme.spacers.size8} />
            <Text className="overflow">{fullName}</Text>
            <Spacer width={theme.spacers.size4} />
            <IconActive
              iconActiveRef={settingsRef}
              handleClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleOpenModal(e)
              }
            >
              <DropDownArrowIcon rotate={ROTATE.NINETY} />
            </IconActive>
            <Spacer width={theme.spacers.size32} />
          </Flex>
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
      <OpenSettingsModal
        open={openModal}
        coords={coords}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};

const StyledSidebarTop = styled(Flex)`
  position: relative;
  border-bottom: solid ${({ theme }) => theme.colors.grey3} 1px;
`;

const DoubleChevronIconContainer = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacers.size16};
`;

export default React.memo(SidebarTop);
