import { useAtom } from "jotai";
import { useState, useLayoutEffect, RefObject } from "react";
import { sidebarAtom } from "../store";

export const useResize = (myRef: RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({
    left: 0,
  });
  const [sidebar] = useAtom(sidebarAtom);

  useLayoutEffect(() => {
    const getDimensions = () => ({
      width: (myRef && myRef?.current?.offsetWidth) || 0,
      height: (myRef && myRef?.current?.offsetHeight) || 0,
    });

    const getPosition = () => ({
      left: (myRef && myRef?.current?.offsetLeft) || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
      setPosition(getPosition());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
      setPosition(getPosition());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, sidebar]);

  return { dimensions, position };
};
