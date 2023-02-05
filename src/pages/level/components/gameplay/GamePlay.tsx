import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharacterObject } from "../../../../data/characterData";
import { validateCharacterPosition } from "../../../../firebase/firebase";
import useToggle from "../../../../hooks/useToggle";
import "./GamePlay.scss";
import {
  clearCoordinates,
  LevelState,
  setClickedCoordinates,
  moveCharacterToFoundArray,
  updateCharacterCounts,
} from "../../../../features/level/levelSlice";

interface Props {
  id: string;
  image: string;
  characterData: Array<CharacterObject | undefined>;
}

interface ValidateCharacterPositionResults {
  isFound: boolean;
  characterName: string;
  levelID: string;
}

const GamePlay: React.FC<Props> = ({ id, image, characterData }) => {
  const dispatch = useDispatch();
  const coordinates = useSelector(
    (state: { levels: LevelState }) => state.levels.clickedCoordinates
  );
  const foundCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.names
  );
  const headerHeight = useSelector(
    (state: { levels: LevelState }) => state.levels.headerHeightInPixels
  );
  const [[magnifierX, magnifierY], setMagnifierXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setImageSize] = useState([0, 0]);
  const [disableMagnifier, setDisableMagnifier] = useState(false);
  const [isMagnifierOpen, , showMagnifier, hideMagnifier] = useToggle(false);
  const [isMenuOpen, , showMenu, hideMenu] = useToggle(false);
  const magnifierHeight = 100;
  const magnifierWidth = 100;
  const zoomLevel = 2;

  const handleImageClick = (e: React.MouseEvent): void => {
    // user clicks somewhere else on the image & cancels the open menu (instead of selecting a character)
    if (isMenuOpen) {
      hideMenu();
      dispatch(clearCoordinates());
      updateMagnifierPosition(e);
      return;
    }
    // user opens the menu at a given spot in the image
    const coordinates = getCoordinatesInPercentages(magnifierX, magnifierY);
    dispatch(setClickedCoordinates(coordinates));
    showMenu();
  };

  const handleCharacterSelection = (e: React.MouseEvent): void => {
    const icon = e.target as HTMLElement;
    const characterName = icon.getAttribute("data-character");
    hideMenu();
    if (!characterName) return;
    setDisableMagnifier(true);
    isCharacterFound(characterName);
  };

  const isCharacterFound = (characterName: string) => {
    // firebase cloud function
    validateCharacterPosition({
      characterName: characterName,
      coordinates: coordinates,
      levelID: id,
    })
      .then((res) => {
        const data = res.data as ValidateCharacterPositionResults;
        const isFound = data.isFound as boolean;
        const character = data.characterName as string;
        if (!character) return;
        if (isFound) {
          dispatch(moveCharacterToFoundArray(character));
          dispatch(updateCharacterCounts());
        }
      })
      .catch((e) => console.log(e));
  };

  // on main image mouse over, update image size & show the magnifier
  const handleMouseEnter = (e: React.MouseEvent): void => {
    if (isMenuOpen) return;
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

  // on moving the mouse outside of the main image
  const handleMouseLeave = (): void => {
    if (isMenuOpen) return;
    hideMagnifier();
  };

  const updateMagnifierPosition = (e: React.MouseEvent): void => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    // calculate cursor position on the image
    const magX = e.pageX - left - window.pageXOffset;
    const magY = e.pageY - top - window.pageYOffset + headerHeight;

    // prevent the magnifier from extending beyond the border of the image
    // on all sides for consistency. why? scrolling beyond the right side
    // causes the scrollbar to rapidly appear and disappear. the effect
    // is replicated across all borders to prevent user confusion.

    const isMouseBeyondLeftBorder = magX < magnifierWidth / 2;
    const isMouseBeyondRightBorder = imgWidth - magX < magnifierWidth / 2;
    const isMouseBeyondTopBorder = magY - headerHeight < magnifierWidth / 2;
    const isMouseBeyondBottomBorder =
      imgHeight + headerHeight - magY < magnifierWidth / 2;

    // left/right: allow up/down movement only
    if (isMouseBeyondRightBorder || isMouseBeyondLeftBorder) {
      setMagnifierXY([magnifierX, magY]);
      return;
    }

    // top/bottom: allow left/right movement only
    if (isMouseBeyondTopBorder || isMouseBeyondBottomBorder) {
      setMagnifierXY([magX, magnifierY]);
      return;
    }

    // cursor is within the image boundaries
    setMagnifierXY([magX, magY]);
  };

  // converts pixel coordinates to percentage coordinates
  // based off of the main image size
  const getCoordinatesInPercentages = (
    xPos: number = magnifierX,
    yPos: number = magnifierY
  ): number[] => {
    return [
      Number(((xPos / imgWidth) * 100).toFixed(3)),
      Number((((yPos - headerHeight) / imgHeight) * 100).toFixed(3)),
    ];
  };

  return (
    <>
      {/* main level image */}
      <img
        src={image}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={() => handleMouseLeave()}
        onClick={(e) => handleImageClick(e)}
        alt={"Wheres Waldo Level"}
        className="gameplay__img"
      />

      {/* magnifier */}
      {isMagnifierOpen && !disableMagnifier && (
        <div
          className="gameplay__zoom"
          style={{
            backgroundImage: `url('${image}')`,
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // move the center of the element to cursor position
            top: `${magnifierY - magnifierHeight / 2}px`,
            left: `${magnifierX - magnifierWidth / 2}px`,
            // set the size of the zoomed image
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            // position the zoomed image within the magnifier div
            backgroundPositionX: `${
              -magnifierX * zoomLevel + magnifierWidth / 2
            }px`,
            backgroundPositionY: `${
              -magnifierY * zoomLevel + magnifierHeight / 2 + headerHeight * 2
            }px`,
          }}
        ></div>
      )}

      {/* character selection menu */}
      {isMenuOpen && (
        <div
          className="menu"
          onClick={(e) => handleCharacterSelection(e)}
          // position menu to the right of the magnifier
          style={{
            top: `${magnifierY - magnifierHeight / 2}px`,
            left: `${magnifierX + magnifierWidth / 2}px`,
          }}
        >
          {characterData
            // remove found characters from the drop down menu
            .filter((character) => {
              if (character && character.name)
                return !foundCharacters.includes(character.name);
            })
            // create character selection options in drop down menu
            .map((character) => {
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
    </>
  );
};

export default GamePlay;
