import React, { useContext } from "react";
import { DividerIcon, ThemeType, Flex, Spacer } from "dekked-design-system";
import { ThemeContext } from "styled-components";
import { Params, SIZES } from "../../../shared";
import Skeleton from "react-loading-skeleton";
import ChangeTextStyles from "./ChangeTextStyles";
import ChangeTextAlignment from "./ChangeTextAlignment";
import ChangeTextColor from "./ChangeTextColor";
import { EditorState } from "draft-js";
import { isAppLoadingAtom, pageIdAtom } from "../../../store";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { savePage } from "../../../api";

interface StudySetToolbarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  toolbarFull?: boolean;
  isDisabled?: boolean;
  iconSize?: SIZES;
  fullHeightBlockTypeModal?: boolean;
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  editorState,
  setEditorState,
  // toolbarFull = true,
  isDisabled = false,
  iconSize = SIZES.MEDIUM,
  fullHeightBlockTypeModal = true,
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  const [isLoading] = useAtom(isAppLoadingAtom);
  const { id: studySetId } = useParams<Params>();
  const [pageId] = useAtom(pageIdAtom);

  const { mutate: updatePage } = useMutation(
    `${studySetId}-save-notes`,
    (editorState: EditorState) => savePage({ editorState, pageId, studySetId })
  );

  return (
    <>
      <Flex width={isLoading ? "100%" : "auto"}>
        {!isLoading ? (
          <>
            <ChangeTextStyles
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              saveEditor={updatePage}
              fullHeightBlockTypeModal={fullHeightBlockTypeModal}
            />
            <Spacer width={theme.spacers.size4} />
            <DividerIcon size={iconSize} />
            <Spacer width={theme.spacers.size4} />
            <ChangeTextAlignment
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              iconSize={iconSize}
              saveEditor={updatePage}
            />
            <Spacer width={theme.spacers.size4} />
            <DividerIcon size={iconSize} />
            <Spacer width={theme.spacers.size4} />
            <ChangeTextColor
              editorState={editorState}
              setEditorState={setEditorState}
              isDisabled={isDisabled}
              iconSize={iconSize}
              saveEditor={updatePage}
            />
          </>
        ) : (
          <div style={{ width: "100%" }}>
            <Skeleton height="24px" width="75%" />
          </div>
        )}
      </Flex>
    </>
  );
};

export default StudySetToolbar;
