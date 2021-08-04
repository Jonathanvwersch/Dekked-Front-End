import { useAtom } from "jotai";
import { useEffect } from "react";
import { layeredModalAtom } from "../store";

const useMultiKeyPress = (isOpen: boolean) => {
  const [, setIsLayeredModalOpen] = useAtom(layeredModalAtom);

  useEffect(() => {
    console.log("in here");
    setIsLayeredModalOpen(true);
    !isOpen && setIsLayeredModalOpen(false);
  }, [isOpen, setIsLayeredModalOpen]);
};

export default useMultiKeyPress;
