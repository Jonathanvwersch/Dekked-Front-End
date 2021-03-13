import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import { Avatar, Card, HFlex, IconActive, Spacer, Text } from "..";
import { DoubleChevronIcon, DropDownArrowIcon } from "../../assets";
import { ROTATE } from "../../assets/types";
import { SidebarContext } from "../../contexts";
import { ThemeType } from "../../styles/theme";

interface SidebarTopProps {}

const SidebarTop: React.FC<SidebarTopProps> = () => {
  const { handleSidebar } = useContext(SidebarContext);
  const theme: ThemeType = useContext(ThemeContext);

  return (
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
  );
};

const StyledSidebarTop = styled.div`
  display: flex;
  position: relative;
  padding: 16px;
`;

const DoubleChevronIconContainer = styled.div`
  position: absolute;
  right: 16px;
  top: 24px;
`;

export default SidebarTop;
