import React, { useContext } from "react";
import { useIsMutating } from "react-query";
import { useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";
import { Params, SIZES } from "../../../shared";
import { ComponentLoadingSpinner, Spacer } from "../../common";

const PageSaving: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { id } = useParams<Params>();
  const isSaving = useIsMutating({ mutationKey: `${id}-save-notes` });

  return (
    <>
      {isSaving ? (
        <>
          <Spacer width={theme.spacers.size32} />
          <ComponentLoadingSpinner size={SIZES.SMALL} />
          {/* <Spacer width={theme.spacers.size4} />
          <Text fontColor={theme.colors.grey1}>
            <FormattedMessage id="generics.saving" />
            ...
          </Text> */}
        </>
      ) : null}
    </>
  );
};

export default PageSaving;
