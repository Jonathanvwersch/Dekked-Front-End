import React, { useContext } from "react";
import { HFlex, Spacer } from "../../common";
import { DividerIcon } from "../../../assets";
import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";
import { SIZES } from "../../../shared";

import ChangeTextStyles from "./ChangeTextStyles";
import ChangeTextColor from "./ChangeTextColor";

interface StudySetToolbarProps {
  toolbarFull?: boolean;
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  toolbarFull = true,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <>
      <HFlex width="auto">
        <ChangeTextStyles />
        <Spacer width={theme.spacers.size8} />
        {/* <DividerIcon size={SIZES.MEDIUM} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextAlignment />
        <Spacer width={theme.spacers.size8} /> */}
        <DividerIcon size={SIZES.MEDIUM} />
        <Spacer width={theme.spacers.size8} />
        <ChangeTextColor />
      </HFlex>
    </>
  );
};

export default StudySetToolbar;
