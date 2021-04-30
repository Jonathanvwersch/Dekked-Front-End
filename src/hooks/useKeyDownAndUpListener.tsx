import { useEffect, useState } from "react";

const useKeyDownAndUpListener = (shouldRun: boolean = true, length: number) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const eventHandler = (event: KeyboardEvent) => {
    if (shouldRun) {
      if (event.key === "ArrowUp") {
        setActiveIndex((activeIndex - 1 + length) % length);
      } else if (event.key === "ArrowDown") {
        setActiveIndex((activeIndex + 1) % length);
      }
    }
  };

  useEffect(() => {
    if (!shouldRun) {
      setActiveIndex(-1);
    }
  }, [shouldRun]);

  useEffect(() => {
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [shouldRun, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return { activeIndex };
};

export default useKeyDownAndUpListener;
