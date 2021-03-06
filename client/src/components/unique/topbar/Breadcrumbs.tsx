import React, { useContext } from "react";
import { useTheme } from "react-jss";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { BinderIcon, FolderIcon, StudySetIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";

interface LocationProps {
  name: string;
  color: string;
  folderData: FolderInterface;
  binderData: BinderInterface;
  studySetData: StudyPackInterface;
}

const Breadcrumbs: React.FC = () => {
  const theme: ThemeType = useTheme();
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();
  const location = useLocation<LocationProps>();
  const { getAsset } = useContext(FileTreeContext);
  const selectedItem = getAsset(type, id);

  const handleUntitled = (name: string) => {
    if (name === "") return "Untitled";
    else return name;
  };

  return (
    <HFlex>
      {location.state && selectedItem ? (
        <>
          <NavLink
            to={{
              pathname: `/${FILETREE_TYPES.FOLDER}/${location.state.folderData?.id}`,
              state: {
                folderData:
                  location.state.folderData && location.state.folderData,
                binderData:
                  location.state.binderData && location.state.binderData,
                studySetData:
                  location.state.studySetData && location.state.studySetData,
              },
            }}
          >
            <HoverCard
              width="auto"
              borderRadius={`${theme.display.borderRadiusTwo}`}
              backgroundColor={`${theme.colors.backgrounds.pageBackground}`}
            >
              <HFlex padding="2px 4px">
                <IconWrapper>
                  <FolderIcon
                    color={
                      type === FILETREE_TYPES.FOLDER
                        ? selectedItem?.color
                        : location.state.folderData?.color
                    }
                  />
                </IconWrapper>
                <Spacer width="4px" />
                <Text maxWidth="200px" overflowText={true}>
                  {type === FILETREE_TYPES.FOLDER
                    ? handleUntitled(selectedItem?.name)
                    : handleUntitled(location.state.folderData?.name)}
                </Text>
              </HFlex>
            </HoverCard>
          </NavLink>

          {type === FILETREE_TYPES.BINDER ||
          type === FILETREE_TYPES.STUDY_SET ? (
            <NavLink
              to={{
                pathname: `/${FILETREE_TYPES.BINDER}/${location.state.binderData?.id}`,
                state: {
                  folderData:
                    location.state.folderData && location.state.folderData,
                  binderData:
                    location.state.binderData && location.state.binderData,
                  studySetData:
                    location.state.studySetData && location.state.studySetData,
                },
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
                      <BinderIcon
                        color={
                          type === FILETREE_TYPES.BINDER
                            ? selectedItem?.color
                            : location.state.binderData?.color
                        }
                      />
                    </IconWrapper>
                    <Spacer width="4px" />
                    <Text maxWidth="200px" overflowText={true}>
                      {type === FILETREE_TYPES.BINDER
                        ? handleUntitled(selectedItem?.name)
                        : handleUntitled(location.state.binderData?.name)}
                    </Text>
                  </HFlex>
                </HoverCard>
              </HFlex>
            </NavLink>
          ) : null}
          {type === FILETREE_TYPES.STUDY_SET ? (
            <NavLink
              to={{
                pathname: `/${FILETREE_TYPES.STUDY_SET}/${location.state.studySetData?.id}`,
                state: {
                  folderData:
                    location.state.folderData && location.state.folderData,
                  binderData:
                    location.state.binderData && location.state.binderData,
                  studySetData:
                    location.state.studySetData && location.state.studySetData,
                },
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
                      <StudySetIcon
                        color={
                          type === FILETREE_TYPES.STUDY_SET
                            ? selectedItem?.color
                            : location.state.studySetData?.color
                        }
                      />
                    </IconWrapper>
                    <Spacer width="4px" />
                    <Text maxWidth="200px" overflowText={true}>
                      {type === FILETREE_TYPES.STUDY_SET
                        ? handleUntitled(selectedItem?.name)
                        : handleUntitled(location.state.studySetData?.name)}
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
