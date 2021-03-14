import React, { useContext } from "react";
import { ThemeType } from "../../../styles/theme";
import { ThemeContext } from "styled-components";
import { BlockOptions, BLOCK_OPTIONS } from "./BlockOptionsModal.data";
import {
  Divider,
  HFlex,
  HoverCard,
  IconWrapper,
  ShadowCard,
  Spacer,
  Text,
} from "../../common";

interface BlockOptionsModalProps {
  handleBlockOptionsModal: () => void;
}

const BlockOptionsModal: React.FC<BlockOptionsModalProps> = ({
  handleBlockOptionsModal,
}) => {
  const theme: ThemeType = useContext(ThemeContext);

  const handleClick = (type: string) => {
    handleBlockOptionsModal();
  };

  return (
    <ShadowCard width={theme.sizes.modal.small}>
      {BlockOptions.map((item, index) => {
        return (
          <>
            <HoverCard
              backgroundColor={theme.colors.backgrounds.modalBackground}
              key={`BlockOptionsModal ${index}`}
              handleClick={() => handleClick(item.action)}
              padding="8px 16px"
            >
              <HFlex>
                <IconWrapper>{item.icon}</IconWrapper>
                <Spacer width={theme.spacers.size8} />
                <Text>{item.action}</Text>
              </HFlex>
            </HoverCard>
            {item.action === BLOCK_OPTIONS.SMALL_HEADING ? <Divider /> : null}
          </>
        );
      })}
    </ShadowCard>
  );
};

export default BlockOptionsModal;
