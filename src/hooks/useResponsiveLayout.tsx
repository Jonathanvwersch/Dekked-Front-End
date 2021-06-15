import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts";

export type Layout = "vertical" | "horizontal";
export const DEFAULT_BREAKPOINT_SIDEBAR_OPEN = 1000;
export const DEFAULT_BREAKPOINT_SIDEBAR_CLOSED = 800;
export const LAYOUT_VERTICAL = "vertical";
export const LAYOUT_HORIZONTAL = "horizontal";

const useResponsiveLayout = (breakpoint?: number): Layout => {
  const { sidebar } = useContext(SidebarContext);
  const appBreakpoint = breakpoint
    ? breakpoint
    : !sidebar
    ? DEFAULT_BREAKPOINT_SIDEBAR_CLOSED
    : DEFAULT_BREAKPOINT_SIDEBAR_OPEN;

  const [layout, setLayout] = useState(
    window.innerWidth < appBreakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
  );

  useEffect(() => {
    const appBreakpoint = breakpoint
      ? breakpoint
      : !sidebar
      ? DEFAULT_BREAKPOINT_SIDEBAR_CLOSED
      : DEFAULT_BREAKPOINT_SIDEBAR_OPEN;

    const handleResize = () =>
      setLayout(
        window.innerWidth < appBreakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);

  return layout as Layout;
};

export default useResponsiveLayout;