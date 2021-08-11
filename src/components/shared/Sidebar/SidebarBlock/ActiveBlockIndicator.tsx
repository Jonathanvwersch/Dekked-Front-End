import { Divider } from "dekked-design-system";
import { useAtom } from "jotai";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { FILETREE_TYPES, Params } from "../../../../shared";
import { bindersAtom, studySetsAtom, typeAtom } from "../../../../store";

interface ActiveBlockIndicatorProps {
  blockId: string;
}

const ActiveBlockIndicator: React.FC<ActiveBlockIndicatorProps> = ({
  blockId,
}) => {
  let isActive = false;
  const [type] = useAtom(typeAtom);
  const { id } = useParams<Params>();
  const [studySets] = useAtom(studySetsAtom);
  const [binders] = useAtom(bindersAtom);
  const theme = useContext(ThemeContext);

  if (
    (type === FILETREE_TYPES.STUDY_SET &&
      studySets?.[id]?.binder_id === blockId) ||
    (studySets && binders?.[studySets?.[id]?.binder_id]?.folder_id === blockId)
  ) {
    isActive = true;
  } else if (
    type === FILETREE_TYPES.BINDER &&
    binders?.[id]?.folder_id === blockId
  ) {
    isActive = true;
  }

  const DividerStyle: React.CSSProperties = {
    position: "absolute",
    right: "0",
    top: "0",
  };

  return (
    <>
      {isActive ? (
        <Divider
          width="2px"
          height="100%"
          color={theme.colors.primary}
          style={DividerStyle}
        />
      ) : null}
    </>
  );
};

export default ActiveBlockIndicator;
