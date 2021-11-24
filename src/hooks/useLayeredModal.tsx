import { useAtom } from "jotai";
import { useEffect } from "react";
import { layeredModalAtom } from "../store";

const useMultiKeyPress = (isOpen: boolean) => {
  const [, setIsLayeredModalOpen] = useAtom(layeredModalAtom);

  useEffect(() => {
    if (isOpen) setIsLayeredModalOpen(true);
    else if (isOpen === false) setIsLayeredModalOpen(false);
  }, [isOpen, setIsLayeredModalOpen]);
};

export default useMultiKeyPress;
