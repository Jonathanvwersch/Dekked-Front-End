import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { HFlex, Spacer, Text, VFlex, Button } from "../../components/common";
import { BUTTON_THEME } from "../../shared";
import { ThemeType } from "../../styles/theme";

const NotFoundPage: React.FC = () => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <HFlex width="100%" height="100%" justifyContent="center">
      <VFlex>
        <Text fontSize={theme.typography.fontSizes.size16}>You're lost</Text>
        <Spacer height={theme.spacers.size8} />
        <Link to={`/`}>
          <Button buttonStyle={BUTTON_THEME.PRIMARY}>Go home</Button>
        </Link>
      </VFlex>
    </HFlex>
  );
};

NotFoundPage.defaultProps = {};

export default NotFoundPage;
