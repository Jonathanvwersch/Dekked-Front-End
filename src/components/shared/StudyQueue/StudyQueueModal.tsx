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
  Box,
} from "../../common";
import { ThemeType } from "../../../styles/theme";
import {
  BUTTON_THEME,
  FILETREE_TYPES,
  STUDY_MODE_TYPES,
} from "../../../shared";

import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { StudySetIcon } from "../../../assets";
import { handleUntitled } from "../../../helpers";
import { FormattedMessage, useIntl } from "react-intl";

interface StudyQueueProps {
  isOpen: boolean;
  handleClose: () => void;
  data: DueSpacedRepetitionDecks | undefined;
  isLoading: boolean;
}

const StudyQueueModal: React.FC<StudyQueueProps> = ({
  isOpen,
  handleClose,
  data,
  isLoading,
}) => {
  const intl = useIntl();
  const theme: ThemeType = useContext(ThemeContext);
  const coords = { bottom: 88, right: 80 };
  const history = useHistory();
  const [studyUrl, setStudyUrl] = useState<string>();
  const [activeId, setActiveId] = useState<string>();

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
          <Box px={theme.spacers.size16} py={theme.spacers.size8} width="100%">
            <Button
              buttonStyle={BUTTON_THEME.PRIMARY}
              isDisabled={!studyUrl}
              handleClick={() => studyUrl && history.push(studyUrl)}
              fullWidth
            >
              <FormattedMessage id="generics.study" />
            </Button>
          </Box>
        </Flex>
      </ShadowCard>
    </Overlay>
  );
};

export default StudyQueueModal;
