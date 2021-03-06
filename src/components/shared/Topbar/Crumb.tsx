import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Flex,
  HoverCard,
  IconWrapper,
  Spacer,
  Text,
  ThemeType,
} from "dekked-design-system";
import { ThemeContext } from "styled-components";
import { FILETREE_TYPES, Params, SIZES } from "../../../shared";
import { useIntl } from "react-intl";
import { handleIconType, handleUntitled } from "../../../helpers";

interface CrumbProps {
  breadCrumbData?: FolderInterface | BinderInterface | StudySetInterface;
  breadCrumbType?: FILETREE_TYPES;
  link?: string;
  name?: string;
  icon?: JSX.Element;
}

const Crumb: React.FC<CrumbProps> = ({
  breadCrumbData,
  breadCrumbType,
  link,
  icon,
  name,
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  const intl = useIntl();
  const history = useHistory();
  const { studyModes } = useParams<Params>();
  const pathName = { pathname: link };

  return (
    <>
      {breadCrumbData || (name && icon) ? (
        <Flex>
          {breadCrumbType !== FILETREE_TYPES.FOLDER && link !== "/" ? (
            <>
              <Spacer width={theme.spacers.size4} />
              <Text
                fontSize={theme.typography.fontSizes.size14}
                fontColor={theme.colors.grey1}
              >
                {">"}
              </Text>
              <Spacer width={theme.spacers.size4} />
            </>
          ) : null}
          <HoverCard
            borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
            handleClick={() => history.push(pathName)}
            width="auto"
            backgroundColor={
              studyModes
                ? theme.colors.backgrounds.studyModeBackground
                : theme.colors.backgrounds.pageBackground
            }
            padding={theme.spacers.size4}
          >
            <Flex>
              <IconWrapper>
                {breadCrumbType && breadCrumbData
                  ? handleIconType(breadCrumbType, breadCrumbData.color)
                  : icon}
              </IconWrapper>
              <Spacer width={theme.spacers.size4} />
              <Text
                maxWidth="120px"
                className="overflow"
                fontSize={theme.typography.fontSizes.size14}
              >
                {breadCrumbData
                  ? handleUntitled(breadCrumbData.name, intl)
                  : name}
              </Text>
            </Flex>
          </HoverCard>
        </Flex>
      ) : null}
    </>
  );
};

export default Crumb;
