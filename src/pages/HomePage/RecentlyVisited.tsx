import {
  Box,
  Divider,
  Flex,
  H1,
  H2,
  SIZES,
  Spacer,
  RecentlyViewedIcon,
  DropDownArrowIcon,
  ROTATE,
  IconActive,
  Text,
} from "dekked-design-system";
import { useAtom } from "jotai";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getUser } from "../../api";
import { FileContainer, Tooltip } from "../../components";

import { FolderBinderCard } from "../../components/folder-binder";
import { getSessionCookie, uniqueApiKey } from "../../helpers";
import { useTheme } from "../../hooks";
import { FILETREE_TYPES } from "../../shared";
import { studySetsAtom, userAtom } from "../../store";

interface RecentlyVisitedProps {}

const RecentlyVisited: React.FC<RecentlyVisitedProps> = () => {
  const theme = useTheme();
  const [user] = useAtom(userAtom);
  const [studySets] = useAtom(studySetsAtom);
  const [showData, setShowData] = useState<boolean>(true);

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
    <Box mt={theme.spacers.size48}>
      <H1 styledAs="h3">
        <FormattedMessage id="home.titles.welcome" />, {fullName} 👋
      </H1>
      <Spacer height={theme.spacers.size64} />
      <Flex>
        <RecentlyViewedIcon size={SIZES.LARGE} />
        <Spacer width={theme.spacers.size16} />
        <H2 styledAs="h4" fontWeight="normal">
          <FormattedMessage id="home.titles.recent" />
        </H2>
        <Spacer width={theme.spacers.size4} />
        <IconActive handleClick={() => setShowData((prevData) => !prevData)}>
          <Tooltip
            id="RecentlyVisitedDropDownArrow"
            text="tooltips.generics.clickToExpand"
          >
            <DropDownArrowIcon
              size={SIZES.LARGE}
              rotate={!showData ? ROTATE.ZERO : ROTATE.NINETY}
            />
          </Tooltip>
        </IconActive>
      </Flex>

      <Divider
        style={{
          margin: `${theme.spacers.size8} 0 ${theme.spacers.size24}`,
        }}
      />
      {showData ? (
        <FileContainer width="325px">
          {isUserLoading ? (
            <>
              <StyledSkeleton height="150px" />
              <StyledSkeleton height="150px" />
              <StyledSkeleton height="150px" />
            </>
          ) : !data?.recently_visited || isEmpty(data?.recently_visited) ? (
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size16}
            >
              <FormattedMessage id="home.noRecentActivity" />
            </Text>
          ) : (
            data?.recently_visited?.map((studySetId) =>
              studySets?.[studySetId] ? (
                <FolderBinderCard
                  key={studySetId}
                  name={studySets?.[studySetId]?.name || ""}
                  color={studySets?.[studySetId]?.color}
                  type={FILETREE_TYPES.STUDY_SET}
                  id={studySets?.[studySetId]?.id}
                  dateModified={studySets?.[studySetId]?.date_modified}
                  size={SIZES.LARGE}
                  unsetWidth
                />
              ) : null
            )
          )}
        </FileContainer>
      ) : null}
    </Box>
  );
};

export const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacers.size32};
`;

export default RecentlyVisited;
