import React, { useContext, useRef, useState } from "react";
import styled from "styled-components/macro";
import { Button, HFlex, Spacer, VFlex, Text, EditableText } from "../../common";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { BUTTON_THEME, FILETREE_TYPES } from "../../../shared";
import { StudyModeModal } from "../../study-mode";
import { usePageSetupHelpers } from "../../../hooks";

interface PageHeaderProps {
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ message }) => {
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme, formatMessage } = usePageSetupHelpers();
  const { selectedBlockName, type, id } = useContext(SelectedItemContext);
  return (
    <>
      <VFlex>
        <StyledEditableText
          itemId={id}
          editableTextRef={headerRef}
          name={selectedBlockName}
        />
        <Spacer height={theme.spacers.size16} />
        <HFlex justifyContent="space-between">
          <Text fontColor={theme.colors.grey1}>{message}</Text>
          <HFlex width="auto">
            {type === FILETREE_TYPES.STUDY_SET ? (
              <>
                <Spacer width={theme.spacers.size16} />
                <Button
                  buttonStyle={BUTTON_THEME.PRIMARY}
                  handleClick={() => setStudyMode(true)}
                >
                  {formatMessage("generics.study")}
                </Button>
              </>
            ) : null}
          </HFlex>
        </HFlex>
        <Spacer height={theme.spacers.size32} />
      </VFlex>
      <StudyModeModal
        isOpen={studyMode}
        handleClose={() => setStudyMode(false)}
      />
    </>
  );
};

const StyledEditableText = styled((props) => <EditableText {...props} />)`
  font-size: ${({ theme }) => theme.typography.fontSizes.size48};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeightSmall};
  &:empty:before {
    color: ${({ theme }) => theme.colors.grey2};
    z-index: 1000;
  }
`;

export default PageHeader;
