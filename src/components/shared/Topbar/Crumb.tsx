import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeType } from "../../../styles/theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import { ThemeContext } from "styled-components";
import { handleUntitled } from "../../../helpers/handleUntitled";
import { FILETREE_TYPES, TAB_TYPE } from "../../../shared";
import { handleIconType } from "../Sidebar/SidebarBlock/SidebarBlock";

interface CrumbProps {
  breadCrumbData?:
    | FolderInterface
    | BinderInterface
    | StudyPackInterface
    | undefined;
  breadCrumbType: FILETREE_TYPES;
}

const Crumb: React.FC<CrumbProps> = ({ breadCrumbData, breadCrumbType }) => {
  const theme: ThemeType = useContext(ThemeContext);

  const link =
    breadCrumbType === FILETREE_TYPES.STUDY_SET
      ? `/${breadCrumbType}/${breadCrumbData?.id}/${TAB_TYPE.NOTES}`
      : `/${breadCrumbType}/${breadCrumbData?.id}`;

  return (
    <>
      {breadCrumbData ? (
        <NavLink
          to={{
            pathname: link,
          }}
        >
          <HFlex>
            {breadCrumbType === FILETREE_TYPES.BINDER ||
            breadCrumbType === FILETREE_TYPES.STUDY_SET ? (
              <>
                <Spacer width={theme.spacers.size4} />
                <Text
                  fontSize={`${theme.typography.fontSizes.size14}`}
                  fontColor={`${theme.colors.grey1}`}
                >
                  /
                </Text>
                <Spacer width={theme.spacers.size4} />
              </>
            ) : null}
            <HoverCard
              width="auto"
              backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
              padding={`0px ${theme.spacers.size4}`}
            >
              <HFlex>
                <IconWrapper>
                  {handleIconType(breadCrumbType, breadCrumbData.color)}
                </IconWrapper>
                <Spacer width={theme.spacers.size4} />
                <Text maxWidth="120px" className="overflow">
                  {breadCrumbData && handleUntitled(breadCrumbData.name)}
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
