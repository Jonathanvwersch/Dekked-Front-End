import { createContext, useState } from "react";
import React from "react";
import { ContentBlock } from "draft-js";

interface TextAlignmentProps {
  changeTextAlignment: (
    alignment: "left" | "right" | "center",
    currentBlock: ContentBlock
  ) => void;
  blockTextAlignments: {
    [id: string]: "left" | "right" | "center";
  };
}

export const TextAlignmentsContext = createContext<TextAlignmentProps>(
  {} as TextAlignmentProps
);

export const TextAlignmentsContextProvider: React.FC = ({ children }) => {
  const [blockTextAlignments, setBlockTextAlignments] = useState(
    {} as { [id: string]: "left" | "right" | "center" }
  );

  const changeTextAlignment = (
    alignment: "left" | "right" | "center",
    currentBlock: ContentBlock
  ) => {
    const currentKey = currentBlock.getKey();
    let copy = { ...blockTextAlignments };
    copy[currentKey] = alignment;
    console.log(copy);
    console.log(currentKey);
    setBlockTextAlignments(copy);
  };

  return (
    <TextAlignmentsContext.Provider
      value={{
        blockTextAlignments,
        changeTextAlignment,
      }}
    >
      {children}
    </TextAlignmentsContext.Provider>
  );
};
