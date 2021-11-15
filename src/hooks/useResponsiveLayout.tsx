import { useAtom } from "jotai";
import { useLayoutEffect, useState } from "react";
import { sidebarAtom } from "../store";

export type Layout = "vertical" | "horizontal";
export const DEFAULT_BREAKPOINT_SIDEBAR_OPEN = 1000;
export const BREAKPOINT_SIDEBAR_CLOSED = 800;
export const BREAKPOINT_MOBILE = 480;
export const LAYOUT_VERTICAL = "vertical";
export const LAYOUT_HORIZONTAL = "horizontal";

const useResponsiveLayout = (breakpoint?: number): Layout => {
  const [sidebar] = useAtom(sidebarAtom);
  const appBreakpoint = breakpoint
    ? breakpoint
    : !sidebar
    ? BREAKPOINT_SIDEBAR_CLOSED
    : DEFAULT_BREAKPOINT_SIDEBAR_OPEN;

  const [layout, setLayout] = useState(
    window.innerWidth < appBreakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
  );

  useLayoutEffect(() => {
    setLayout(
      window.innerWidth < appBreakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
    );
  }, [sidebar, appBreakpoint]);

  useLayoutEffect(() => {
    const handleResize = () =>
      setLayout(
        window.innerWidth < appBreakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [appBreakpoint, breakpoint]);

  return layout as Layout;
};

export default useResponsiveLayout;
