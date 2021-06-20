/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";
import { useAsset } from "./helpers";
const whyDidYouRender = require("@welldone-software/why-did-you-render");
whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackExtraHooks: [
    [require("jotai/utils"), "useAtom"],
    [useAsset, "useAsset"],
  ],
});
