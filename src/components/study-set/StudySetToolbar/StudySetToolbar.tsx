import React, { useContext } from "react";
import { HFlex, Spacer } from "../../common";
import { DividerIcon } from "../../../assets";
import { ThemeContext } from "styled-components/macro";
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
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  editorState,
  setEditorState,
  toolbarFull = true,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <>
      <HFlex width="auto">
        <ChangeTextStyles
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <Spacer width={theme.spacers.size8} />
        <DividerIcon size={SIZES.MEDIUM} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextAlignment
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <Spacer width={theme.spacers.size8} />
        <DividerIcon size={SIZES.MEDIUM} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextColor
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </HFlex>
    </>
  );
};

export default StudySetToolbar;
