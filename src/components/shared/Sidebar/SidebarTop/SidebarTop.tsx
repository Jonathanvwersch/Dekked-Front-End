import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
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
import { ROTATE } from "../../../../assets/Icon.types";
import { SidebarContext } from "../../../../contexts";
import { ThemeType } from "../../../../styles/theme";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
  const { handleSidebar } = useContext(SidebarContext);
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <VFlex>
      <StyledSidebarTop>
        <Card padding="0px">
          <HFlex>
            <Avatar>T</Avatar>
            <Spacer width={theme.spacers.size8} />
            <Text className="overflow">This is a really really long name</Text>
            <Spacer width={theme.spacers.size4} />
            <IconActive>
              <DropDownArrowIcon rotate={ROTATE.NINETY} />
            </IconActive>
            <Spacer width={theme.spacers.size32} />
          </HFlex>
        </Card>

        <DoubleChevronIconContainer>
          <IconActive handleClick={handleSidebar}>
            <DoubleChevronIcon />
          </IconActive>
        </DoubleChevronIconContainer>
      </StyledSidebarTop>
      <Divider />
    </VFlex>
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
