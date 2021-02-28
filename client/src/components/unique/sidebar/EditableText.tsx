import React from "react";

import { Text } from "../../common";

interface EditableTextProps {
  editableText: boolean;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ children, ...props }) => {
  return (
    <Text
      className={props.className}
      overflowText={true}
      editableText={props.editableText}
    >
      {children}
    </Text>
  );
};

export default EditableText;
