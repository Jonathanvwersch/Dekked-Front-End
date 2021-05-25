import React, { useContext } from "react";
import { Flex, Spacer } from "../../common";
import { DividerIcon } from "../../../assets";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../../styles/theme";
import { SIZES } from "../../../shared";

import ChangeTextStyles from "./ChangeTextStyles";
import ChangeTextAlignment from "./ChangeTextAlignment";
import ChangeTextColor from "./ChangeTextColor";
import { EditorState } from "draft-js";

interface StudySetToolbarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toolbarFull?: boolean;
  isDisabled?: boolean;
  iconSize?: SIZES;
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  editorState,
  setEditorState,
  toolbarFull = true,
  isDisabled = false,
  iconSize = SIZES.MEDIUM,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <>
      <Flex width="auto">
        <ChangeTextStyles
          editorState={editorState}
          setEditorState={setEditorState}
          isDisabled={isDisabled}
          iconSize={iconSize}
        />
        <Spacer width={theme.spacers.size8} />
        <DividerIcon size={iconSize} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextAlignment
          editorState={editorState}
          setEditorState={setEditorState}
          isDisabled={isDisabled}
          iconSize={iconSize}
        />
        <Spacer width={theme.spacers.size8} />
        <DividerIcon size={iconSize} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextColor
          editorState={editorState}
          setEditorState={setEditorState}
          isDisabled={isDisabled}
          iconSize={iconSize}
        />
      </Flex>
    </>
  );
};

export default StudySetToolbar;
