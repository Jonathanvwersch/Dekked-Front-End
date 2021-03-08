import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BinderIcon, FolderIcon, StudySetIcon } from "../../../assets";
import { ThemeType } from "../../../styles/theme";
import { HFlex, HoverCard, IconWrapper, Spacer, Text } from "../../common";
import {
  FileTreeContext,
  FILETREE_TYPES,
} from "../../../contexts/FileTreeContext";
import { ThemeContext } from "styled-components";
import { handleUntitled } from "../../../helpers/handleUntitled";

const Breadcrumbs: React.FC = () => {
  const [folderData, setFolderData] = useState<FolderInterface>();
  const [binderData, setBinderData] = useState<BinderInterface>();
  const [studySetData, setStudySetData] = useState<StudyPackInterface>();
  const theme: ThemeType = useContext(ThemeContext);
  const { type, id } = useParams<{ type: FILETREE_TYPES; id: string }>();
  const { getAsset } = useContext(FileTreeContext);

  useEffect(() => {
    if (type === FILETREE_TYPES.FOLDER) {
      setFolderData(getAsset(type, id) as FolderInterface);
    } else if (type === FILETREE_TYPES.BINDER) {
      setBinderData(getAsset(type, id) as BinderInterface);
      setFolderData(
        getAsset(
          FILETREE_TYPES.FOLDER,
          binderData?.folder_id!
        ) as FolderInterface
      );
    } else {
      setStudySetData(getAsset(type, id) as StudyPackInterface);
      setBinderData(
        getAsset(
          FILETREE_TYPES.BINDER,
          studySetData?.binder_id!
        ) as BinderInterface
      );
      setFolderData(
        getAsset(
          FILETREE_TYPES.FOLDER,
          binderData?.folder_id!
        ) as FolderInterface
      );
    }
  }, [id, binderData, studySetData, folderData, getAsset, type]);

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
            borderRadius={`${theme.display.borderRadiusTwo}`}
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
                borderRadius={`${theme.display.borderRadiusTwo}`}
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
              pathname: `/${FILETREE_TYPES.STUDY_SET}/${studySetData?.id}`,
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
                borderRadius={`${theme.display.borderRadiusTwo}`}
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
