import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ThemeType } from "../../../styles/theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import { ThemeContext } from "styled-components/macro";
import { FILETREE_TYPES, Params } from "../../../shared";
import { useIntl } from "react-intl";
import { handleIconType, handleUntitled } from "../../../helpers";

interface CrumbProps {
  breadCrumbData?: FolderInterface | BinderInterface | StudyPackInterface;
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
  const { studyModes } = useParams<Params>();

  return (
    <>
      {breadCrumbData || (name && icon) ? (
        <NavLink
          to={{
            pathname: link,
          }}
        >
          <HFlex>
            {breadCrumbType !== FILETREE_TYPES.FOLDER ? (
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
              width="auto"
              backgroundColor={
                studyModes
                  ? theme.colors.backgrounds.studyModeBackground
                  : theme.colors.backgrounds.pageBackground
              }
              padding={`0px ${theme.spacers.size4}`}
            >
              <HFlex>
                <IconWrapper>
                  {breadCrumbType && breadCrumbData
                    ? handleIconType(breadCrumbType, breadCrumbData.color)
                    : icon}
                </IconWrapper>
                <Spacer width={theme.spacers.size4} />
                <Text maxWidth="120px" className="overflow">
                  {breadCrumbData
                    ? handleUntitled(breadCrumbData.name, intl)
                    : name}
                </Text>
              </HFlex>
            </HoverCard>
          </HFlex>
        </NavLink>
      ) : null}
    </>
  );
};

export default Crumb;
