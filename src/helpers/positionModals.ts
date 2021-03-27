export interface CoordsProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

// Function used to get mouse click position
export const getMousePosition = (e: any) => {
  const rect = e.target.getBoundingClientRect();
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

// Function used to position modals depending on position of button click 
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
