import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import levelSlice, {
  setClickedCoordinates,
} from "../../../../features/level/levelSlice";
import useToggle from "../../../../hooks/useToggle";
import "./GamePlay.scss";

// zoom image source: Anxiny article on dev.to
// https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

interface Props {
  image: string;
}

function GamePlay({ image }: Props) {
  const dispatch = useDispatch();
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImageSize] = useState([0, 0]);
  const [isMagnifierOpen, , showMagnifier, hideMagnifier] = useToggle(false);
  const [isMenuOpen, , showMenu, hideMenu] = useToggle(false);
  const magnifierHeight = 100;
  const magnifieWidth = 100;
  const zoomLevel = 2;

  const handleClick = (e: React.MouseEvent): void => {
    if (!isMenuOpen) {
      showMenu();
      hideMagnifier();
    }

    // update state levelSlice w/ coordinates
    const coordinatePercentages = [
      ((x / imgWidth) * 100).toFixed(3),
      ((y / imgHeight) * 100).toFixed(3),
    ];
    dispatch(setClickedCoordinates(coordinatePercentages));
  };

  const handleMouseEnter = (e: React.MouseEvent): void => {
    if (isMenuOpen) return;
    // update image size and turn-on magnifier
    const elem = e.target as HTMLElement;
    const { width, height } = elem.getBoundingClientRect();
    setImageSize([width, height]);
    showMagnifier();
  };

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (isMenuOpen) return;
    // update cursor position
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    // calculate cursor position on the image
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div className="gameplay">
      {/* main level image */}
      <img
        src={image}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={() => hideMagnifier()}
        onClick={(e) => handleClick(e)}
        alt={"Wheres Waldo Level"}
      />

      {/* magnifier */}
      {isMagnifierOpen && (
        <div
          className="gameplay__zoom"
          style={{
            backgroundImage: `url('${image}')`,
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            // zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            // zoom image position:
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      )}

      {/* character selection menu */}
      {isMenuOpen && <div className="gameplay__characterselect">{}</div>}
    </div>
  );
}

export default GamePlay;
