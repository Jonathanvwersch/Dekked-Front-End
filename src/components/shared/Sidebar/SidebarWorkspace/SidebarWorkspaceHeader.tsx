import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Card, Text } from "../../../common";
import { ThemeContext } from "styled-components";
import { useAtom } from "jotai";
import { isAppLoadingAtom, numberOfFoldersAtom } from "../../../../store";
import Skeleton from "react-loading-skeleton";

interface SidebarWorkspaceHeaderProps {}

const SidebarWorkspaceHeader: React.FC<SidebarWorkspaceHeaderProps> = () => {
  const [numberOfFolders] = useAtom(numberOfFoldersAtom);
  const theme = useContext(ThemeContext);
  const [isLoading] = useAtom(isAppLoadingAtom);

  return (
    <Card padding={`${theme.spacers.size8} ${theme.spacers.size16}`}>
      <Text
        fontSize={theme.typography.fontSizes.size14}
        fontColor={theme.colors.grey1}
      >
        {!isLoading ? (
          <FormattedMessage
            id="sidebar.workspace.header"
            values={{
              num: numberOfFolders || 0,
            }}
          />
        ) : (
          <Skeleton width="100px" />
        )}
      </Text>
    </Card>
  );
};

export default React.memo(SidebarWorkspaceHeader);
