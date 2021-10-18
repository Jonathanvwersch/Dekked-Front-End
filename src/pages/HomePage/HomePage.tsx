import { Box, Divider, H1, H2, SIZES, Spacer } from "dekked-design-system";
import { useAtom } from "jotai";
import React from "react";
import { FormattedMessage } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getUser } from "../../api";
import { FileContainer } from "../../components";
import { InsetPage } from "../../components/common";
import MainFrame from "../../components/common/MainFrame/MainFrame";
import { FolderBinderCard } from "../../components/folder-binder";
import { getSessionCookie, uniqueApiKey } from "../../helpers";
import { useTheme } from "../../hooks";
import { FILETREE_TYPES } from "../../shared";
import { studySetsAtom, userAtom } from "../../store";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const theme = useTheme();
  const [user] = useAtom(userAtom);
  const [studySets] = useAtom(studySetsAtom);

  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";
  const fullName = `${firstName} ${lastName}`;

  const { data, isLoading: isUserLoading } = useQuery<UserInterface>(
    uniqueApiKey("user"),
    getUser,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      enabled: Boolean(getSessionCookie()),
    }
  );

  return (
    <MainFrame>
      <InsetPage size={SIZES.MEDIUM}>
        <Box mt={theme.spacers.size48}>
          <H1 styledAs="h3">
            <FormattedMessage id="home.titles.welcome" />, {fullName} 👋
          </H1>
          <Spacer height={theme.spacers.size64} />
          <H2 styledAs="h4" fontWeight="normal">
            <FormattedMessage id="home.titles.recent" />
          </H2>
          <Divider
            style={{
              margin: `${theme.spacers.size8} 0 ${theme.spacers.size24}`,
            }}
          />
          <FileContainer width="325px">
            {isUserLoading ? (
              <>
                <StyledSkeleton width="325px" height="150px" />
                <StyledSkeleton width="325px" height="150px" />
                <StyledSkeleton width="325px" height="150px" />
              </>
            ) : !data?.recently_visited ? (
              <FormattedMessage id="home.noRecentActivity" />
            ) : (
              data?.recently_visited?.map((studySetId) =>
                studySets?.[studySetId] ? (
                  <FolderBinderCard
                    name={studySets?.[studySetId]?.name || ""}
                    color={studySets?.[studySetId]?.color}
                    type={FILETREE_TYPES.FOLDER}
                    id={studySets?.[studySetId]?.id}
                    dateModified={studySets?.[studySetId]?.date_modified}
                    size={SIZES.LARGE}
                  />
                ) : null
              )
            )}
          </FileContainer>

          {/* <H2 styledAs="h4">Today</H2>
          <Divider
            style={{
              margin: `${theme.spacers.size32} 0`,
            }}
          />
          <H2 styledAs="h4">Statistics</H2> */}
        </Box>
      </InsetPage>
    </MainFrame>
  );
};

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacers.size32};
`;

export default HomePage;
