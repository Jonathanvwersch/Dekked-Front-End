import React from "react";
import { NotFoundPage } from "../pages";
import { Switch, useParams } from "react-router-dom";
import { Params } from "../shared";
import { fileAtom, isAppLoadingAtom } from "../store";
import { useAtom } from "jotai";

const CustomSwitch: React.FC = ({ children }) => {
  const [files] = useAtom(fileAtom);
  const { id } = useParams<Params>();
  const [isLoading] = useAtom(isAppLoadingAtom);
  const doesIdExist = !id || isLoading ? true : files?.includes(id);

  return (
    <Switch>
      {doesIdExist && children}
      <NotFoundPage />
    </Switch>
  );
};

export default CustomSwitch;
