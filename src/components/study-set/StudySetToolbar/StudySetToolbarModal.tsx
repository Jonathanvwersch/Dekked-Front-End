import React, { useContext } from "react";
import { ScrollerModal } from "../../common";
import { EditorContext } from "../../../contexts/EditorContext";
import { BLOCK_TYPES, CoordsType } from "../../../shared";
import { ConvertToBlockData } from "../../notetaking/TextModal/NotetakingBlocks.data";
import { RichUtils } from "draft-js";

interface StudySetToolbarModalProps {
  open: boolean;
  handleClose: () => void;
  coords?: CoordsType;
}

const StudySetToolbarModal: React.FC<StudySetToolbarModalProps> = ({
  handleClose,
  open,
  coords,
}) => {
  const { setEditorState, editorState } = useContext(EditorContext);
  const clickFunctions = (type: BLOCK_TYPES) => {
    handleClose();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
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
