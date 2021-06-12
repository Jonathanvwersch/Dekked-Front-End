import { useEffect, useState } from "react";

export type Layout = "vertical" | "horizontal";
export const DEFAULT_BREAKPOINT = 1200;
export const LAYOUT_VERTICAL = "vertical";
export const LAYOUT_HORIZONTAL = "horizontal";

const useResponsiveLayout = (
  breakpoint: number = DEFAULT_BREAKPOINT
): Layout => {
  const [layout, setLayout] = useState(
    window.innerWidth < breakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
  );

  useEffect(() => {
    const handleResize = () =>
      setLayout(
        window.innerWidth < breakpoint ? LAYOUT_VERTICAL : LAYOUT_HORIZONTAL
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return layout as Layout;
};

export default useResponsiveLayout;
