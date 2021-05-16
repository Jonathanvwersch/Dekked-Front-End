import React from "react";
import { ScrollerModal } from "../../common";
import { BLOCK_TYPES, CoordsType } from "../../../shared";
import { ConvertToBlockData } from "../../notetaking/TextModal/NotetakingBlocks.data";
import { EditorState, RichUtils } from "draft-js";
import { getCurrentBlock } from "../../notetaking/Editor/Editor.helpers";

interface StudySetToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  coords?: CoordsType;
}

const StudySetToolbarModal: React.FC<StudySetToolbarModalProps> = ({
  handleClose,
  open,
  coords,
  editorState,
  setEditorState,
}) => {
  const clickFunctions = (type: BLOCK_TYPES) => {
    handleClose();

    // only change block type if user chooses option other than current block type
    if (getCurrentBlock(editorState).getType() !== type) {
      setEditorState(RichUtils.toggleBlockType(editorState, type));
    }
  };

  return (
    <ScrollerModal
      coords={coords}
      clickFunctions={clickFunctions}
      open={open}
      handleClose={handleClose}
      data={ConvertToBlockData}
      fullHeight={true}
    />
  );
};

export default StudySetToolbarModal;
