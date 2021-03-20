import { EditorState } from "draft-js";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { TextModalData } from "./TextModal.data";

import {
  HFlex,
  HoverCard,
  IconWrapper,
  Overlay,
  ShadowCard,
  Spacer,
  Text,
} from "../../common";
import { CoordsProps } from "../../../helpers/positionModals";
import { positionBlockEditor } from "../Utils/editorUtils";

const getSelectedBlockNode = (root: any) => {
  const selection = root.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  let node = selection.getRangeAt(0).startContainer;
  do {
    if (node.getAttribute && node.getAttribute("data-block") === "true") {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
};

interface TextModalProps {
  onToggle: (style: string) => void;
  editorState: EditorState;
}

const TextModal: React.FC<TextModalProps> = ({ onToggle, editorState }) => {
  const node = React.useRef<HTMLDivElement>(null);
  const theme = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [coords, setCoords] = useState<CoordsProps>();

  const updatePosition = () => {
    const nodeSelected = getSelectedBlockNode(window);
    if (nodeSelected) {
      const selectedBox = nodeSelected.getBoundingClientRect();
      const blockHeight = 180;
      const newCoords = positionBlockEditor(selectedBox, blockHeight);
      setCoords({
        ...newCoords,
      });
    }
  };

  const getCurrentBlock = () => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  };

  const currentBlock = getCurrentBlock();

  useEffect(() => {
    updatePosition();
    if (
      currentBlock.getText() === "/" &&
      currentBlock.getType() === "unstyled"
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentBlock]);

  const eventHandler = (event: KeyboardEvent) => {
    if (open) {
      if (event.key === "ArrowUp") {
        setIndex((index - 1 + TextModalData.length) % TextModalData.length);
      } else if (event.key === "ArrowDown") {
        setIndex((index + 1) % TextModalData.length);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [open, index]);

  useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);

  const handleToggle = (e: KeyboardEvent, style: string) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(style);
  };

  return (
    <Overlay state={open} handleState={() => setOpen(false)} coords={coords}>
      <ShadowCard cardRef={node} width={theme.sizes.modal.small}>
        {TextModalData.map((item, dataIndex) => (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`TextModal ${dataIndex}`}
            handleClick={(e: KeyboardEvent) => handleToggle(e, item.style)}
            padding="8px 16px"
            index={dataIndex}
            activeIndex={index}
          >
            <HFlex>
              <IconWrapper>{item.icon}</IconWrapper>
              <Spacer width={theme.spacers.size8} />
              <Text>{item.label}</Text>
            </HFlex>
          </HoverCard>
        ))}
      </ShadowCard>
    </Overlay>
  );
};

export default TextModal;
