import React, { useContext } from "react";
import { Flex, Spacer } from "../../common";
import { DividerIcon } from "../../../assets";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../../styles/theme";
import { SIZES } from "../../../shared";
import Skeleton from "react-loading-skeleton";
import ChangeTextStyles from "./ChangeTextStyles";
import ChangeTextAlignment from "./ChangeTextAlignment";
import ChangeTextColor from "./ChangeTextColor";
import { EditorState } from "draft-js";
import { isAppLoadingAtom } from "../../../store";
import { useAtom } from "jotai";

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
  const [isLoading] = useAtom(isAppLoadingAtom);

  return (
    <>
      <Flex width="auto">
        {!isLoading ? (
          <>
            <ChangeTextStyles
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              iconSize={iconSize}
            />
            <Spacer width={theme.spacers.size4} />
            <DividerIcon size={iconSize} />
            <Spacer width={theme.spacers.size4} />
            <ChangeTextAlignment
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              iconSize={iconSize}
            />
            <Spacer width={theme.spacers.size4} />
            <DividerIcon size={iconSize} />
            <Spacer width={theme.spacers.size4} />
            <ChangeTextColor
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              iconSize={iconSize}
            />
          </>
        ) : (
          <Skeleton height="24px" width="450px" />
        )}
      </Flex>
    </>
  );
};

export default StudySetToolbar;
