import { Box, Divider, H2, SIZES } from "dekked-design-system";
import React from "react";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { useTheme } from "../../hooks";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const theme = useTheme();

  return (
    <MainFrame>
      <InsetPage size={SIZES.MEDIUM}>
        <Box mt={theme.spacers.size48}>
          <H2 styledAs="h4">Recent</H2>
          <Divider
            style={{
              margin: `${theme.spacers.size32} 0`,
            }}
          />
          <H2 styledAs="h4">Today</H2>
          <Divider
            style={{
              margin: `${theme.spacers.size32} 0`,
            }}
          />
          <H2 styledAs="h4">Statistics</H2>
        </Box>
      </InsetPage>
    </MainFrame>
  );
};

export default HomePage;
