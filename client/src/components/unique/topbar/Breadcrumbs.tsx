import React, { useContext } from "react";
import { useTheme } from "react-jss";
import { NavLink } from "react-router-dom";
import { BinderIcon, FolderIcon, StudySetIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import { FILETREE_TYPES } from "../../../contexts/FileTreeContext";
import { SidebarContext } from "../../../contexts";

interface BreadcrumbsProps {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
  const theme: ThemeType = useTheme();
  const {
    selectedItem,
    handleBinderData,
    handleFolderData,
    handleStudySetData,
  } = useContext(SidebarContext);

  return (
    <HFlex>
      {selectedItem ? (
        <>
          <NavLink
            to={{
              pathname: `/${FILETREE_TYPES.FOLDER}/${selectedItem.folderData?.id}`,
            }}
            onClick={() => {
              selectedItem.folderData &&
                handleFolderData(selectedItem.folderData);
            }}
          >
            <HoverCard
              width="auto"
              borderRadius={`${theme.display.borderRadiusTwo}`}
              backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
            >
              <HFlex padding="2px 4px">
                <IconWrapper>
                  <FolderIcon color={selectedItem.folderData?.color} />
                </IconWrapper>
                <Spacer width="4px" />
                <Text maxWidth="200px" overflowText={true}>
                  {selectedItem.folderData?.name === ""
                    ? "Untitled"
                    : selectedItem.folderData?.name}
                </Text>
              </HFlex>
            </HoverCard>
          </NavLink>

          {selectedItem.binderData ? (
            <NavLink
              to={{
                pathname: `/${FILETREE_TYPES.BINDER}/${selectedItem.binderData?.id}`,
              }}
              onClick={() => {
                selectedItem.binderData &&
                  selectedItem.folderData &&
                  handleBinderData(
                    selectedItem.folderData,
                    selectedItem.binderData
                  );
              }}
            >
              <HFlex padding="0px">
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
                  borderRadius={`${theme.display.borderRadiusTwo}`}
                  backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
                >
                  <HFlex padding="2px 4px">
                    <IconWrapper>
                      <BinderIcon color={selectedItem.binderData?.color} />
                    </IconWrapper>
                    <Spacer width="4px" />
                    <Text maxWidth="200px" overflowText={true}>
                      {selectedItem.binderData?.name === ""
                        ? "Untitled"
                        : selectedItem.binderData?.name}
                    </Text>
                  </HFlex>
                </HoverCard>
              </HFlex>
            </NavLink>
          ) : null}
          {selectedItem.studySetData ? (
            <NavLink
              to={{
                pathname: `/${FILETREE_TYPES.STUDY_SET}/${selectedItem.studySetData?.id}`,
              }}
              onClick={() => {
                selectedItem.binderData &&
                  selectedItem.studySetData &&
                  selectedItem.folderData &&
                  handleStudySetData(
                    selectedItem.folderData,
                    selectedItem.binderData,
                    selectedItem.studySetData
                  );
              }}
            >
              <HFlex padding="0px">
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
                  borderRadius={`${theme.display.borderRadiusTwo}`}
                  backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
                >
                  <HFlex padding="2px 4px">
                    <IconWrapper>
                      <StudySetIcon color={selectedItem.studySetData?.color} />
                    </IconWrapper>
                    <Spacer width="4px" />
                    <Text maxWidth="200px" overflowText={true}>
                      {selectedItem.studySetData?.name === ""
                        ? "Untitled"
                        : selectedItem.studySetData?.name}
                    </Text>
                  </HFlex>
                </HoverCard>
              </HFlex>
            </NavLink>
          ) : null}
        </>
      ) : null}
    </HFlex>
  );
};

export default Breadcrumbs;
