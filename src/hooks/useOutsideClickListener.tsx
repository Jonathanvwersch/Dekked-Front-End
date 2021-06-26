import { MutableRefObject, useCallback, useEffect } from "react";

const useOutsideClickListener = (
  element: MutableRefObject<any> | undefined,
  handler: (args?: any) => void,
  shouldRun: boolean = true,
  withEscape: boolean = true,
  withEnter: boolean = false
) => {
  const handleClickOutside = useCallback(
    (e: Event) => {
      if (element && element.current && !element.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        handler();
      }
    },
    [handler, element]
  );

  useEffect(() => {
    if (shouldRun) {
      window.addEventListener("mousedown", handleClickOutside);
      return () => window.removeEventListener("mousedown", handleClickOutside);
    } else window.removeEventListener("mousedown", handleClickOutside);
    return () => {};
  }, [shouldRun, handleClickOutside]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (withEscape && e.key === "Escape") handler();
      if (withEnter && e.key === "Enter") handler();
    },
    [handler, withEnter, withEscape]
  );

  useEffect(() => {
    if (shouldRun) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
    return () => {};
  }, [handleEscape, shouldRun, withEscape]);
};

export default useOutsideClickListener;
