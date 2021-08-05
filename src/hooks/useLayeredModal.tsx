import { useAtom } from "jotai";
import { useEffect } from "react";
import { layeredModalAtom } from "../store";

const useMultiKeyPress = (isOpen: boolean) => {
  const [, setIsLayeredModalOpen] = useAtom(layeredModalAtom);

  useEffect(() => {
    setIsLayeredModalOpen(true);
    !isOpen && setIsLayeredModalOpen(false);
  }, [isOpen, setIsLayeredModalOpen]);
};

export default useMultiKeyPress;
