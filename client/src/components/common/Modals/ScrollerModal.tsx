import React, { Fragment, useContext } from "react";
import { ThemeContext } from "styled-components";
import {
  Divider,
  HFlex,
  HoverCard,
  IconWrapper,
  Overlay,
  ShadowCard,
  Spacer,
  Text,
} from "..";
import { CoordsProps } from "../../../helpers/positionModals";

interface ScrollerModalProps {
  open: boolean;
  handleClose: () => void;
  clickFunctions: any;
  data: {
    label: string;
    icon: React.ReactNode;
    divider?: boolean;
    style?: string;
  }[];
  coords?: CoordsProps;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const ScrollerModal: React.FC<ScrollerModalProps> = ({
  open,
  handleClose,
  cardRef,
  clickFunctions,
  data,
  coords,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Overlay state={open} handleState={handleClose} coords={coords}>
      <ShadowCard cardRef={cardRef} width={theme.sizes.modal.small}>
        {data.map((item, index) => {
          return (
            <Fragment key={`ScrollerModal ${index}`}>
              <HoverCard
                backgroundColor={theme.colors.backgrounds.modalBackground}
                key={`TextModal ${index}`}
                handleClick={clickFunctions(
                  item?.style ? item.style : item.label
                )}
                padding="8px 16px"
              >
                <HFlex>
                  <IconWrapper>{item.icon}</IconWrapper>
                  <Spacer width={theme.spacers.size8} />
                  <Text>{item.label}</Text>
                </HFlex>
              </HoverCard>
              {item?.divider ? <Divider /> : null}
            </Fragment>
          );
        })}
      </ShadowCard>
    </Overlay>
  );
};

export default ScrollerModal;
