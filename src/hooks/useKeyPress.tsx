import { useCallback, useEffect, useState } from "react";

const useKeyPress = (targetKey: string, onKeyPress?: () => void) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    ({ key }: any) => {
      if (key === targetKey) {
        console.log();
        onKeyPress && onKeyPress();
        setKeyPressed(true);
      }
    },
    [onKeyPress, targetKey]
  );
  // If released key is our target key then set to false
  const upHandler = useCallback(
    ({ key }: any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, upHandler]); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};

export default useKeyPress;
