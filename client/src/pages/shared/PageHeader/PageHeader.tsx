import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { Button, H1, HFlex, Spacer, VFlex, Text } from "../../../common";
import { BUTTON_THEME } from "../../../common/Button/Button";
import { SidebarContext } from "../../../contexts";
import { TAB_TYPE } from "../../../contexts/FileTreeContext";
import { ThemeType } from "../../../styles/theme";

interface PageHeaderProps {
  type: string;
  id: string;
  name?: string;
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  type,
  id,
  name,
  message,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const theme: ThemeType = useContext(ThemeContext);
  const { tab } = useParams<{ tab: TAB_TYPE }>();

  // const [blockName, setBlockName] = useState<string | undefined>();
  // const { handleUpdateName } = useContext(SidebarContext);

  // useEffect(() => {
  //   console.log("blockName", blockName);
  //   console.log(headerRef.current?.innerText);

  //   handleUpdateName(type, id, blockName);
  // }, [blockName, headerRef.current]);

  return (
    <VFlex>
      <StyledH1
        ref={headerRef}
        onDragOver={(e: any) => {
          e.preventDefault();
        }}
        onPaste={(e: any) => {
          e.preventDefault();
          return false;
        }}
        contentEditable={true}
        spellCheck={false}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
          // setBlockName(headerRef.current?.innerText);
        }}
      >
        {children}
      </StyledH1>
      <Spacer height="16px" />
      <HFlex justifyContent="space-between">
        <Text fontColor={theme.colors.grey1}>{message}</Text>
        <HFlex width="auto">
          {tab === TAB_TYPE.FLASHCARDS ? (
            <Button buttonStyle={BUTTON_THEME.SECONDARY}>
              + Add flashcard
            </Button>
          ) : null}
          <Spacer width="16px" />
          <Button buttonStyle={BUTTON_THEME.PRIMARY} disabled={true}>
            Study
          </Button>
        </HFlex>
      </HFlex>
      <Spacer height="32px" />
    </VFlex>
  );
};

const StyledH1 = styled((props) => <H1 {...props} />)`
  width: 100%;
  &:empty:before {
    content: "Untitled";
    color: ${({ theme }) => theme.colors.grey2};
    cursor: text;
  }
`;

export default PageHeader;
