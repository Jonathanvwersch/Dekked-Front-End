import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BinderIcon, FolderIcon, StudySetIcon } from "../../assets";
import { ThemeType } from "../../styles/theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "..";
import { FILETREE_TYPES, TAB_TYPE } from "../../contexts/FileTreeContext";
import { ThemeContext } from "styled-components";
import { handleUntitled } from "../../helpers/handleUntitled";
import { SelectedItemContext } from "../../contexts/SelectedItemContext";

const Breadcrumbs: React.FC = () => {
  const theme: ThemeType = useContext(ThemeContext);
  const { folderData, binderData, studySetData, type } = useContext(
    SelectedItemContext
  );

  return (
    <HFlex>
      <>
        <NavLink
          to={{
            pathname: `/${FILETREE_TYPES.FOLDER}/${folderData?.id}`,
          }}
        >
          <HoverCard
            width="auto"
            backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
            padding="2px 4px"
          >
            <HFlex>
              <IconWrapper>
                <FolderIcon color={folderData?.color} />
              </IconWrapper>
              <Spacer width="4px" />
              <Text maxWidth="200px" className="overflow">
                {handleUntitled(folderData?.name!)}
              </Text>
            </HFlex>
          </HoverCard>
        </NavLink>

        {type === FILETREE_TYPES.BINDER || type === FILETREE_TYPES.STUDY_SET ? (
          <NavLink
            to={{
              pathname: `/${FILETREE_TYPES.BINDER}/${binderData?.id}`,
            }}
          >
            <HFlex>
              <Spacer width="4px" />
              <Text
                fontSize={`${theme.typography.fontSizes.size14}`}
                fontColor={`${theme.colors.grey1}`}
              >
                /
              </Text>
              <Spacer width="4px" />
              <HoverCard
                width="auto"
                backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
                padding="2px 4px"
              >
                <HFlex>
                  <IconWrapper>
                    <BinderIcon color={binderData?.color} />
                  </IconWrapper>
                  <Spacer width="4px" />
                  <Text maxWidth="200px" className="overflow">
                    {handleUntitled(binderData?.name!)}
                  </Text>
                </HFlex>
              </HoverCard>
            </HFlex>
          </NavLink>
        ) : null}
        {type === FILETREE_TYPES.STUDY_SET ? (
          <NavLink
            to={{
              pathname: `/${FILETREE_TYPES.STUDY_SET}/${studySetData?.id}/${TAB_TYPE.NOTES}`,
            }}
          >
            <HFlex>
              <Spacer width="4px" />
              <Text
                fontSize={`${theme.typography.fontSizes.size14}`}
                fontColor={`${theme.colors.grey1}`}
              >
                /
              </Text>
              <Spacer width="4px" />
              <HoverCard
                width="auto"
                backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
                padding="2px 4px"
              >
                <HFlex>
                  <IconWrapper>
                    <StudySetIcon color={studySetData?.color} />
                  </IconWrapper>
                  <Spacer width="4px" />
                  <Text maxWidth="200px" className="overflow">
                    {handleUntitled(studySetData?.name!)}
                  </Text>
                </HFlex>
              </HoverCard>
            </HFlex>
          </NavLink>
        ) : null}
      </>
    </HFlex>
  );
};

export default Breadcrumbs;
