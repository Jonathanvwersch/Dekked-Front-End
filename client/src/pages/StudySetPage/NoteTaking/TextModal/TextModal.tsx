import { EditorState } from "draft-js";
import React, { useContext, useEffect } from "react";
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
} from "../../../../components/common";
import { ThemeType } from "../../../../styles/theme";

const getSelectedBlockNode = (root: any) => {
  const selection = root.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  let node = selection.getRangeAt(0).startContainer;
  // console.log(node);
  do {
    if (node.getAttribute && node.getAttribute("data-block") === "true") {
      return node;
    }
    node = node.parentNode;
    // console.log(node);
  } while (node !== null);
  return null;
};

export default function TextModal({
  onToggle,
  editorState,
  setEditorState,
}: {
  onToggle: any;
  editorState: EditorState;
  setEditorState: any;
}) {
  const node = React.useRef<any>(null);
  const [style, setStyle] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const theme: ThemeType = useContext(ThemeContext);
  const [index, setIndex] = React.useState(0);

  const updatePosition = () => {
    const nodeSelected = getSelectedBlockNode(window);
    if (nodeSelected) {
      const selectedBox = nodeSelected.getBoundingClientRect();
      setStyle({
        top: selectedBox.top - 180,
      });
    }
  };

  const getCurrentBlock = () => {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  };

  useEffect(() => {
    updatePosition();
    const currentBlock = getCurrentBlock();
    if (
      currentBlock.getText() === "/" &&
      currentBlock.getType() === "unstyled"
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [editorState]);

  const eventHandler = (event: KeyboardEvent) => {
    if (open) {
      if (event.key === "ArrowUp") {
        event.stopPropagation();
        setIndex((index - 1 + TextModalData.length) % TextModalData.length);
      } else if (event.key === "ArrowDown") {
        event.stopPropagation();
        setIndex((index + 1) % TextModalData.length);
      } else if (event.key === "Enter") {
        event.stopPropagation();
        onToggle(TextModalData[index].style);
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

  return (
    <Overlay state={open} handleState={() => setOpen(false)}>
      <ShadowCard cardRef={node} width={theme.sizes.modal.small}>
        {TextModalData.map((item, index) => (
          <HoverCard
            backgroundColor={theme.colors.backgrounds.modalBackground}
            key={`TextModal ${index}`}
            handleClick={() => onToggle(item.style)}
            padding="8px 16px"
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
}
