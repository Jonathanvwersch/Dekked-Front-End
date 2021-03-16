import { EditorState } from "draft-js";
import React from "react";
import {
  BulletedListIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
} from "../../../assets";
import "./styles/BlockToolBar.css";

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

function Tool({
  onToggle,
  item,
  selected,
}: {
  onToggle: any;
  item: {
    label: String;
    style: String;
    icon: any;
  };
  selected: Boolean;
}) {
  return (
    <div
      className={`toolContainer ${selected && "selected"}`}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(item.style);
      }}
    >
      {item.icon}
      <p className="toolLabel">{item.label}</p>
    </div>
  );
}

const BLOCK_TYPES = [
  {
    label: "Large heading",
    style: "header-one",
    icon: <H1Icon size="20px" color="black" />,
  },
  {
    label: "Medium heading",
    style: "header-two",
    icon: <H2Icon size="20px" color="black" />,
  },
  {
    label: "Small heading",
    style: "header-three",
    icon: <H3Icon size="20px" color="black" />,
  },
  {
    label: "Bulleted list",
    style: "unordered-list-item",
    icon: <BulletedListIcon size="20px" color="black" />,
  },
  {
    label: "Numbered list",
    style: "ordered-list-item",
    icon: <NumberedListIcon size="20px" color="black" />,
  },
];

export default function BlockToolBar({
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

  React.useEffect(() => {
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
        event.preventDefault();
        event.stopPropagation();
        setIndex((index - 1 + BLOCK_TYPES.length) % BLOCK_TYPES.length);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        setIndex((index + 1) % BLOCK_TYPES.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        onToggle(BLOCK_TYPES[index].style);
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [open, index]);

  React.useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);

  return (
    <div
      ref={node}
      style={style}
      className={`blockToolBoxContainer ${open ? "visible" : "hidden"}`}
    >
      {BLOCK_TYPES.map((type, i) => (
        <Tool key={i} onToggle={onToggle} item={type} selected={i === index} />
      ))}
    </div>
  );
}
