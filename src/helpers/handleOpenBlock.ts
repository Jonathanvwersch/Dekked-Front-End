export const handleOpenBlock = (
  id: string,
  isBlockOpen: {
    [id: string]: boolean;
  },
  setIsBlockOpen: React.Dispatch<
    React.SetStateAction<{
      [id: string]: boolean;
    }>
  >,
  isOpen?: boolean
) => {
  if (isOpen && isOpen === isBlockOpen[id]) return;

  let fileCopy = { ...isBlockOpen };
  if (isOpen === true || isOpen === false) {
    fileCopy[id] = isOpen;
  } else {
    fileCopy[id] = !fileCopy[id];
  }
  setIsBlockOpen(fileCopy);
};
