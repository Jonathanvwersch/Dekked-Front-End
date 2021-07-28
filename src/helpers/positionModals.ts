// Function used to get mouse click position
export const getMousePosition = (
  e: any,
  ref?: React.RefObject<HTMLElement>
) => {
  const rect = ref
    ? ref?.current?.getBoundingClientRect()
    : e.target.getBoundingClientRect();
  const distanceToTop = rect.y + rect.height + 4; // Distance from mouse click to top of window
  const distanceToBottom = window.innerHeight - distanceToTop + rect.height + 8; // Distance from mouse click to bottom of window
  const distanceToLeft = rect.x; // Distance from mouse click to left of window
  const distanceToRight = window.innerWidth - distanceToLeft; // Distance from mouse click to right of window
  return {
    top: distanceToTop,
    right: distanceToRight,
    bottom: distanceToBottom,
    left: distanceToLeft,
  };
};

// Function used to position modals depending on position of button click
export const positionModals = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  componentHeight?: number,
  ref?: React.RefObject<HTMLElement>
) => {
  const { top, bottom, left } = getMousePosition(e, ref);
  let newCoordinate;

  if (componentHeight && bottom < componentHeight + 32) {
    newCoordinate = { bottom: bottom };
  } else {
    newCoordinate = { top: top };
  }

  return { ...newCoordinate, left: left };
};
