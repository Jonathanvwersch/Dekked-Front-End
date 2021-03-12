import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { HFlex, Spacer, Text, VFlex, Button } from "../../common";
import { BUTTON_THEME } from "../../common/Button/Button";
import { ThemeType } from "../../styles/theme";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  const theme: ThemeType = useContext(ThemeContext);

  return (
    <HFlex width="100%" height="100%" justifyContent="center">
      <VFlex>
        <Text fontSize={theme.typography.fontSizes.size16}>You're lost</Text>
        <Spacer height="8px" />
        <Link to={`/`}>
          <Button buttonStyle={BUTTON_THEME.PRIMARY}>Go home</Button>
        </Link>
      </VFlex>
    </HFlex>
  );
};

NotFoundPage.defaultProps = {};

export default NotFoundPage;
