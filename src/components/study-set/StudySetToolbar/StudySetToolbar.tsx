import React, { useContext, useState } from "react";
import { HFlex, IconActive, IconWrapper, Spacer } from "../../common";
import {
  BodyTextIcon,
  BoldIcon,
  CenterAlignIcon,
  DividerIcon,
  DropDownArrowIcon,
  ItalicsIcon,
  LeftAlignIcon,
  RightAlignIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "../../../assets";
import { StudySetToolbarModal } from ".";
import { EditorContext } from "../../../contexts/EditorContext";
import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";
import { SIZES, TEXT_STYLES } from "../../../shared";
import { ROTATE } from "../../../assets/icons/Icon.types";

interface StudySetToolbarProps {
  toolbarFull?: boolean;
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  toolbarFull = true,
}) => {
  const [blockOptionsModal, setBlockOptionsModal] = useState<boolean>(false);
  const theme: ThemeType = useContext(ThemeContext);
  const stylesToRemove = [
    TEXT_STYLES.ALIGN_CENTER,
    TEXT_STYLES.ALIGN_LEFT,
    TEXT_STYLES.ALIGN_RIGHT,
  ];

  const { toggleInlineStyle, toggleBlockStyle } = useContext(EditorContext);

  return (
    <>
      <HFlex width="auto">
        <IconWrapper>
          <IconActive handleMouseDown={() => setBlockOptionsModal(true)}>
            <HFlex>
              <BodyTextIcon size={SIZES.MEDIUM} />
              <DropDownArrowIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />
            </HFlex>
          </IconActive>
          {blockOptionsModal && (
            <StudySetToolbarModal
              coords={{ top: 24, left: 4 }}
              open={blockOptionsModal}
              handleClose={() => setBlockOptionsModal(false)}
            />
          )}
        </IconWrapper>
        <Spacer width={theme.spacers.size8} />
        <IconActive
          handleMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInlineStyle(TEXT_STYLES.BOLD);
          }}
        >
          <BoldIcon size={SIZES.MEDIUM} />
        </IconActive>
        <Spacer width={theme.spacers.size8} />
        <IconActive
          handleMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInlineStyle(TEXT_STYLES.ITALIC);
          }}
        >
          <ItalicsIcon size={SIZES.MEDIUM} />
        </IconActive>
        <Spacer width={theme.spacers.size8} />
        <IconActive
          handleMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInlineStyle(TEXT_STYLES.UNDERLINE);
          }}
        >
          <UnderlineIcon size={SIZES.MEDIUM} />
        </IconActive>
        <Spacer width={theme.spacers.size8} />
        <IconActive
          handleMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            toggleInlineStyle(TEXT_STYLES.STRIKETHROUGH);
          }}
        >
          <StrikethroughIcon size={SIZES.MEDIUM} />
        </IconActive>

        {toolbarFull ? (
          <>
            <Spacer width="8px" />
            <DividerIcon size={SIZES.MEDIUM} />
            <Spacer width="8px" />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(TEXT_STYLES.ALIGN_LEFT, stylesToRemove);
              }}
            >
              <LeftAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
            <Spacer width="8px" />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(TEXT_STYLES.ALIGN_CENTER, stylesToRemove);
              }}
            >
              <CenterAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
            <Spacer width="8px" />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(TEXT_STYLES.ALIGN_RIGHT, stylesToRemove);
              }}
            >
              <RightAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
          </>
        ) : null}
      </HFlex>
    </>
  );
};

export default StudySetToolbar;
