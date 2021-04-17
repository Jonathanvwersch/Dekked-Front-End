import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { SIZES } from "../../../shared";
import { IconActive, Spacer, Tooltip, VFlex } from "../../common";
import { DeleteModal } from "../../shared";

interface StudyModeToolbarProps {}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = () => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <StudyToolbar width="auto" height="100%" justifyContent="flex-start">
        <Tooltip
          id="EditFlashcard"
          text="tooltips.studyMode.editCard"
          place="left"
        >
          <IconActive>
            <EditIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
        <Tooltip
          id="DeleteFlashcard"
          text="tooltips.studyMode.deleteCard"
          place="left"
        >
          <IconActive handleClick={() => setIsOpen(true)}>
            <DeleteForeverIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
      </StudyToolbar>
      <DeleteModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        bodyText="studyMode.deleteModal.deleteCard"
      />
    </>
  );
};

const StudyToolbar = styled(VFlex)`
  position: absolute;
  right: -${({ theme }) => theme.spacers.size48};
`;

export default StudyModeToolbar;
