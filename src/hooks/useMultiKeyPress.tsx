import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";

const useMultiKeyPress = (targetKeys: string[], onKeyPress?: () => void) => {
  const [keysPressed, setKeyPressed] = useState<any>(new Set([]));

  const downHandler = useCallback(
    ({ key }: any) => {
      setKeyPressed(keysPressed.add(key));
      if (isEqual([...keysPressed], targetKeys)) {
        onKeyPress && onKeyPress();
      }
    },
    [targetKeys, onKeyPress, keysPressed]
  );

  const upHandler = useCallback(() => keysPressed.clear(), [keysPressed]);

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

  return keysPressed;
};

export default useMultiKeyPress;
