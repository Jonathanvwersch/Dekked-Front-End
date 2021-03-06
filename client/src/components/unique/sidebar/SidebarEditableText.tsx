import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { FileTreeContext } from "../../../contexts";
import { ThemeType } from "../../../theme";

interface SidebarEditableTextProps {
  editableText: boolean;
  editableTextRef: React.RefObject<HTMLDivElement>;
  setEditableText: Dispatch<SetStateAction<boolean>>;
  blockType: string;
  blockId: string;
  blockName: string | undefined;
  setBlockName: Dispatch<SetStateAction<string | undefined>>;
}

const SidebarEditableText: React.FC<SidebarEditableTextProps> = ({
  children,
  ...props
}) => {
  const classes = useStyles({ ...props });

  const { updateAsset } = useContext(FileTreeContext);

  const handleRename = () => {
    updateAsset(props.blockType, props.blockId, {
      name: props.blockName,
    });
  };

  useEffect(() => {
    const updateEditableName = (e: any) => {
      // When user clicks away from name, make sure the beginning of the name is shown
      if (props.editableTextRef.current) {
        props.editableTextRef.current.addEventListener("blur", () => {
          props.editableTextRef.current!.scrollLeft = 0;
        });
      }

      // Turn off editability of text
      if (props.editableText) {
        if (!props.editableTextRef?.current?.contains(e.target)) {
          props.setEditableText((prevValue) => !prevValue);
          handleRename();
        }
      }
    };
    document.addEventListener("click", updateEditableName);

    return () => {
      document.removeEventListener("click", updateEditableName);
    };
  }, [props]);

  return (
    <div
      contentEditable={props.editableText}
      suppressContentEditableWarning={true}
      spellCheck={false}
      className={classes.editableText}
      ref={props.editableTextRef}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.setEditableText((prevValue) => !prevValue);
          handleRename();
        }
        props.setBlockName(props.editableTextRef.current?.innerText);
      }}
    >
      {children}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  editableText: (props) => ({
    fontSize: props.fontSize || `${theme.typography.fontSizes.size12}`,
    fontWeight: props.fontWeight,
    color: `${theme.colors.fontColor}`,
    margin: "0",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    flex: "1 1 auto",
    "&[contenteditable=true]": {
      textOverflow: "clip",
    },
    "&:empty:before": {
      content: '"Untitled"',
    },
  }),
}));

export default SidebarEditableText;
