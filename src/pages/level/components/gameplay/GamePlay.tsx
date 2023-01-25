import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import levelSlice, {
  setCharacterSelection,
  setClickedCoordinates,
} from "../../../../features/level/levelSlice";
import useToggle from "../../../../hooks/useToggle";
import "./GamePlay.scss";
import { CharacterObject } from "../../../../data/characterData";

// zoom image source: Anxiny article on dev.to
// https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

interface Props {
  image: string;
  characterData: Array<CharacterObject | undefined>;
}

function GamePlay({ image, characterData }: Props) {
  const dispatch = useDispatch();
  const [[magnifierX, magnifierY], setMagnifierXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImageSize] = useState([0, 0]);
  const [disableMagnifier, setDisableMagnifier] = useState(false);
  const [isMagnifierOpen, , showMagnifier, hideMagnifier] = useToggle(false);
  const [isMenuOpen, , showMenu, hideMenu] = useToggle(false);
  const magnifierHeight = 100;
  const magnifierWidth = 100;
  const zoomLevel = 2;

  const getCoordinatesInPercentages = (): number[] => {
    return [
      Number(((magnifierX / imgWidth) * 100).toFixed(3)),
      Number(((magnifierY / imgHeight) * 100).toFixed(3)),
    ];
  };

  const handleImageClick = (e: React.MouseEvent): void => {
    if (isMenuOpen) {
      hideMenu();
      dispatch(setClickedCoordinates(null));
      updateMagnifierPosition(e);
      return;
    }

    const coordinates = getCoordinatesInPercentages();
    dispatch(setClickedCoordinates(coordinates));
    // coordinates[1] < 50 ? (menuDirection = "down") : (menuDirection = "up");
    showMenu();
  };

  const handleCharacterSelection = (e: React.MouseEvent): void => {
    const icon = e.target as HTMLElement;
    const characterName = icon.getAttribute("data-character");
    console.log("characterName", characterName);
    dispatch(setCharacterSelection(characterName));
    hideMenu();
    setDisableMagnifier(true);
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
    updateMagnifierPosition(e);
    setDisableMagnifier(false);
  };

  const handleMouseLeave = (): void => {
    if (isMenuOpen) return;
    hideMagnifier();
  };

  const updateMagnifierPosition = (e: React.MouseEvent): void => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    // calculate cursor position on the image
    const magX = e.pageX - left - window.pageXOffset;
    const magY = e.pageY - top - window.pageYOffset;
    setMagnifierXY([magX, magY]);
  };

  return (
    <div className="gameplay">
      {/* main level image */}
      <img
        src={image}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={(e) => handleImageClick(e)}
        alt={"Wheres Waldo Level"}
      />

      {/* magnifier */}
      {isMagnifierOpen && !disableMagnifier && (
        <div
          className="gameplay__zoom"
          style={{
            backgroundImage: `url('${image}')`,
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // move element center to cursor pos
            top: `${magnifierY - magnifierHeight / 2}px`,
            left: `${magnifierX - magnifierWidth / 2}px`,
            // zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            // zoom image position:
            backgroundPositionX: `${
              -magnifierX * zoomLevel + magnifierWidth / 2
            }px`,
            backgroundPositionY: `${
              -magnifierY * zoomLevel + magnifierHeight / 2
            }px`,
          }}
        ></div>
      )}

      {/* character selection menu */}
      {isMenuOpen && (
        <div
          className="menu"
          onClick={(e) => handleCharacterSelection(e)}
          style={{
            top: `${magnifierY - magnifierHeight / 2}px`,
            left: `${magnifierX + magnifierWidth / 2}px`,
          }}
        >
          {characterData.map((character) => {
            if (character && character.icon && character.name)
              return (
                <div
                  className="menu__character"
                  key={character.name}
                  data-character={character.name}
                >
                  <img
                    src={character.icon}
                    alt={character.name}
                    className="menu__icon"
                  />
                  <h5 className="menu__name">{character.name}</h5>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default GamePlay;
