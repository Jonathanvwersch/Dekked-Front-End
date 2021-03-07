import React from "react";
import { Toolbar, VFlex } from "../../components/common";

interface StudySetHeaderProps {}

const StudySetHeader: React.FC<StudySetHeaderProps> = () => {
  return (
    <VFlex>
      <Toolbar />
    </VFlex>
  );
};

export default StudySetHeader;
