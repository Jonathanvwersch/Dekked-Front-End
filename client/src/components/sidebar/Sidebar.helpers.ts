// Function used to get mouse click position
export const getMousePosition = (e: MouseEvent) => {
  const event = e.target as HTMLElement; // Necessary conversion so typescript doesnt complain about MouseEvent type
  const rect = event.getBoundingClientRect();
  const distanceToTop = rect.y; // Distance from mouse click to top of window
  const distanceToBottom = window.innerHeight - distanceToTop; // Distance from mouse click to bottom of window
  const distanceToLeft = rect.x + rect.width / 2; // Distance from mouse click to left of window
  const distanceToRight = window.innerWidth - distanceToLeft; // Distance from mouse click to right of window
  return {
    top: distanceToTop,
    right: distanceToRight,
    bottom: distanceToBottom,
    left: distanceToLeft,
  };
};

// Function used to position modals depending on positio of button click used to open modal
export const positionModals = (e: MouseEvent, componentHeight: number) => {
  const { top, bottom, left } = getMousePosition(e);
  let newCoordinate;

  if (componentHeight && bottom - componentHeight < componentHeight) {
    newCoordinate = { bottom: bottom };
  } else {
    newCoordinate = { top: top };
  }
  return { ...newCoordinate, left: left };
};
