import { SIZES } from "dekked-design-system";

import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";

import RecentlyVisited from "./RecentlyVisited";
import DueDecks from "./DueDecks";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <MainFrame>
      <InsetPage size={SIZES.MEDIUM}>
        <RecentlyVisited />
        <DueDecks />
      </InsetPage>
    </MainFrame>
  );
};

export default HomePage;
