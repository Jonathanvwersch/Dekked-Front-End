import { useEffect, useState } from "react";

const useKeyDownAndUpListener = (
  shouldRun: boolean = true,
  length: number,
  preventDefault?: boolean
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const eventHandler = (event: KeyboardEvent) => {
    if (shouldRun) {
      if (event.key === "ArrowUp") {
        preventDefault && event.preventDefault();
        setActiveIndex((activeIndex - 1 + length) % length);
      } else if (event.key === "ArrowDown") {
        preventDefault && event.preventDefault();
        setActiveIndex((activeIndex + 1) % length);
      }
    }
  };

  useEffect(() => {
    if (!shouldRun) {
      setActiveIndex(-1);
    }
    setActiveIndex(0);
  }, [shouldRun]);

  useEffect(() => {
    if (activeIndex > length - 1) {
      setActiveIndex(-1);
    }
  }, [length, activeIndex]);

  useEffect(() => {
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [shouldRun, activeIndex, length]); // eslint-disable-line react-hooks/exhaustive-deps

  return { activeIndex };
};

export default useKeyDownAndUpListener;
