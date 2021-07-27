import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  Divider,
  Flex,
  Scroller,
  ShadowCard,
  Button,
  Overlay,
  Block,
  ComponentLoadingSpinner,
} from "../../common";
import { ThemeType } from "../../../styles/theme";
import {
  BUTTON_THEME,
  FILETREE_TYPES,
  Params,
  STUDY_MODE_TYPES,
} from "../../../shared";
import { useQuery } from "react-query";
import { getAllDueSrDecks } from "../../../api";
import { useHistory, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { StudySetIcon } from "../../../assets";
import { handleUntitled } from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";

interface StudyQueueProps {
  isOpen: boolean;
  handleClose: () => void;
}

const StudyQueueModal: React.FC<StudyQueueProps> = ({
  isOpen,
  handleClose,
}) => {
  const intl = useIntl();
  const theme: ThemeType = useContext(ThemeContext);
  const coords = { bottom: 78, right: 78 };
  const { id: studySetId } = useParams<Params>();
  const history = useHistory();
  const [studyUrl, setStudyUrl] = useState<string>();
  const [activeId, setActiveId] = useState<string>();

  const { data, isLoading } = useQuery<DueSpacedRepetitionDecks>(
    `${studySetId}-get-all-due-sr-decks`,
    getAllDueSrDecks
  );

  return (
    <Overlay isOpen={isOpen} handleClose={handleClose} coords={coords}>
      <ShadowCard width="300px" height="350px" position="relative">
        <Flex flexDirection="column" height="100%" width="100%">
          <Scroller height="100%" width="100%">
            {!isLoading ? (
              data &&
              !isEmpty(data) &&
              Object.entries(data).map((dueDeck) => (
                <Block
                  key={dueDeck?.[0]}
                  icon={<StudySetIcon color={dueDeck?.[1]?.iconColor} />}
                  text={handleUntitled(dueDeck?.[1]?.name, intl)}
                  extraText={`(${String(dueDeck?.[1]?.number_of_cards)})`}
                  handleClick={() => {
                    if (activeId === dueDeck?.[1]?.study_set_id) {
                      setActiveId(undefined);
                      setStudyUrl(undefined);
                    } else {
                      setActiveId(dueDeck?.[1]?.study_set_id);
                      setStudyUrl(
                        `/${FILETREE_TYPES.STUDY_SET}/${dueDeck?.[1]?.study_set_id}/study/${STUDY_MODE_TYPES.SPACED_REPETITION}`
                      );
                    }
                  }}
                  fontWeight={
                    activeId === dueDeck?.[1]?.study_set_id
                      ? theme.typography.fontWeights.bold
                      : theme.typography.fontWeights.normal
                  }
                  className={
                    activeId === dueDeck?.[1]?.study_set_id
                      ? "active"
                      : undefined
                  }
                />
              ))
            ) : (
              <ComponentLoadingSpinner height="100%" />
            )}
          </Scroller>
          <Divider />
          <Flex justifyContent="flex-end" p={theme.spacers.size8}>
            <Button
              buttonStyle={BUTTON_THEME.PRIMARY}
              isDisabled={!studyUrl}
              handleClick={() => studyUrl && history.push(studyUrl)}
            >
              <FormattedMessage id="generics.study" />
            </Button>
          </Flex>
        </Flex>
      </ShadowCard>
    </Overlay>
  );
};

export default StudyQueueModal;
