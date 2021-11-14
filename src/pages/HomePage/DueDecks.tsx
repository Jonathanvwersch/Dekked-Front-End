import {
  Box,
  Divider,
  Flex,
  H2,
  Spacer,
  DueIcon,
  SIZES,
  DropDownArrowIcon,
  IconActive,
  ROTATE,
  Text,
  Button,
  BUTTON_THEME,
} from "dekked-design-system";
import React, { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { useQuery } from "react-query";
import { getAllDueSrDecks } from "../../api";
import { FileContainer, FolderBinderCard, Tooltip } from "../../components";

import { usePageSetupHelpers } from "../../hooks";
import { FILETREE_TYPES } from "../../shared";
import { StyledSkeleton } from "./RecentlyVisited";

interface DueDecksProps {}

const DueDecks: React.FC<DueDecksProps> = () => {
  const { formatMessage, theme } = usePageSetupHelpers();
  const [showData, setShowData] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  const { data, isLoading } = useQuery<DueSpacedRepetitionDecks>(
    "get-all-due-sr-decks",
    getAllDueSrDecks,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const numberOfDueDecks = data ? Object.keys(data).length : 0;

  const dueDecks = Object.entries(data || []).map((dueDeck) => (
    <FolderBinderCard
      studyMode
      key={dueDeck?.[0]}
      name={dueDeck?.[1]?.name || ""}
      color={dueDeck?.[1]?.iconColor || ""}
      type={FILETREE_TYPES.STUDY_SET}
      id={dueDeck?.[1]?.study_set_id}
      unsetWidth
      bottomText={`${formatMessage("home.dueDecks.dueCards")} ${String(
        dueDeck?.[1]?.number_of_cards || 0
      )}`}
    />
  ));

  return (
    <Box mt={theme.spacers.size48}>
      <Flex>
        <DueIcon size={SIZES.LARGE} />
        <Spacer width={theme.spacers.size16} />
        <H2 styledAs="h4" fontWeight="normal">
          <FormattedMessage id="home.titles.dueDecks" /> (
          <FormattedNumber value={numberOfDueDecks} />)
        </H2>
        <Spacer width={theme.spacers.size4} />
        <IconActive handleClick={() => setShowData((prevData) => !prevData)}>
          <Tooltip
            id="DueDecksDropDownArrow"
            text="tooltips.generics.clickToExpand"
          >
            <DropDownArrowIcon
              size={SIZES.LARGE}
              rotate={!showData ? ROTATE.ZERO : ROTATE.NINETY}
            />
          </Tooltip>
        </IconActive>
        <Spacer width={theme.spacers.size32} />
        {!isLoading && numberOfDueDecks > 10 && (
          <Button
            handleClick={() => setShowAll((prevData) => !prevData)}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            <FormattedMessage
              id={`${
                showAll ? "home.dueDecks.showLess" : "home.dueDecks.showAll"
              }`}
            />{" "}
            {showAll ? "-" : "+"}
          </Button>
        )}
      </Flex>
      <Divider
        style={{
          margin: `${theme.spacers.size8} 0 ${theme.spacers.size24}`,
        }}
      />
      {showData ? (
        <FileContainer width="210px">
          {isLoading ? (
            <>
              <StyledSkeleton height="90px" />
              <StyledSkeleton height="90px" />
              <StyledSkeleton height="90px" />
            </>
          ) : numberOfDueDecks === 0 ? (
            <Text
              fontColor={theme.colors.grey1}
              fontSize={theme.typography.fontSizes.size16}
            >
              <FormattedMessage id="studyMode.flashcard.caughtUp" />
            </Text>
          ) : (
            <>{dueDecks.splice(0, showAll ? numberOfDueDecks : 10)}</>
          )}
        </FileContainer>
      ) : null}
    </Box>
  );
};

export default DueDecks;
