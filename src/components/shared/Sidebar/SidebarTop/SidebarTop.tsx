import React, { useContext, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  Avatar,
  Card,
  IconActive,
  Spacer,
  Text,
  Flex,
  DoubleChevronIcon,
  DropDownArrowIcon,
  LogoIcon,
  ROTATE,
  ThemeType,
} from "dekked-design-system";
import { positionModals } from "../../../../helpers";
import { OpenSettingsModal } from "../../../settings";
import { CoordsType } from "../../../../shared";
import { useAtom } from "jotai";
import { sidebarAtom, userAtom } from "../../../../store";
import { Tooltip } from "../../../common";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const settingsRef = useRef<HTMLButtonElement>(null);
  const [user] = useAtom(userAtom);

  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";
  const fullName = `${firstName} ${lastName}`;
  const firstLetterOfFirstName = firstName?.[0] || "";
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const [openMainSettingsModal, setOpenMainSettingsModal] =
    useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
    const modalHeight = 68;
    setCoords(positionModals(e, modalHeight, settingsRef));
  };

  const ariaText = sidebar
    ? "tooltips.sidebar.openSidebar"
    : "tooltips.sidebar.closeSidebar";

  return (
    <>
      <StyledSidebarTop py={theme.spacers.size12} px={theme.spacers.size16}>
        <Card padding="0px">
          <Flex>
            <Avatar handleClick={() => setOpenMainSettingsModal(true)}>
              {firstLetterOfFirstName ? (
                firstLetterOfFirstName.toUpperCase()
              ) : (
                <LogoIcon color="white" />
              )}
            </Avatar>
            <Spacer width={theme.spacers.size8} />
            <Text
              fontSize={theme.typography.fontSizes.size14}
              className="overflow"
            >
              {fullName}
            </Text>
            <Spacer width={theme.spacers.size4} />
            <IconActive
              iconActiveRef={settingsRef}
              handleClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                handleOpenModal(e)
              }
            >
              <DropDownArrowIcon rotate={ROTATE.NINETY} />
            </IconActive>
            <Spacer width={theme.spacers.size24} />
          </Flex>
        </Card>

        <DoubleChevronIconContainer>
          <IconActive
            handleClick={() => setSidebar((prevState) => !prevState)}
            ariaLabel={ariaText}
          >
            <Tooltip id="CloseSidebar" text={ariaText}>
              <DoubleChevronIcon
                rotate={!sidebar ? ROTATE.ONEEIGHTY : undefined}
              />
            </Tooltip>
          </IconActive>
        </DoubleChevronIconContainer>
      </StyledSidebarTop>
      <OpenSettingsModal
        openMainSettingsModal={openMainSettingsModal}
        setOpenMainSettingsModal={setOpenMainSettingsModal}
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
  user-select: none;
`;

const DoubleChevronIconContainer = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacers.size16};
`;

export default React.memo(SidebarTop);
