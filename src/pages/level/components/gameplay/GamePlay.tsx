import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearCoordinates,
  LevelState,
  setClickedCoordinates,
  moveCharacterToFoundArray,
  updateCharacterCounts,
  addCoordinatesToFoundArray,
} from "../../../../features/level/levelSlice";
import { CharacterObject } from "../../../../data/characterData";
import "./GamePlay.scss";
import useToggle from "../../../../hooks/useToggle";
import { validateCharacterPosition } from "../../../../firebase/firebase";
import { useSelector } from "react-redux";

// zoom image source: Anxiny article on dev.to
// https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

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
  const foundCharacterCoordinates = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.coordinates
  );
  const headerHeight = useSelector(
    (state: { levels: LevelState }) => state.levels.headerHeightInPixels
  );
  const [[magnifierX, magnifierY], setMagnifierXY] = useState([0, 0]);
  const [disableMagnifier, setDisableMagnifier] = useState(false);
  const [isMagnifierOpen, , showMagnifier, hideMagnifier] = useToggle(false);
  const [isMenuOpen, , showMenu, hideMenu] = useToggle(false);
  const [[imgWidth, imgHeight], setImageSize] = useState([0, 0]);
  const magnifierHeight = 100;
  const magnifierWidth = 100;
  const zoomLevel = 2;

  const isCharacterFound = (characterName: string) => {
    // firebase cloud function:
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
          dispatch(addCoordinatesToFoundArray(coordinates));
        }
      })
      .catch((e) => console.log(e));
  };

  const handleImageClick = (e: React.MouseEvent): void => {
    if (isMenuOpen) {
      hideMenu();
      dispatch(clearCoordinates());
      updateMagnifierPosition(e);
      return;
    }

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
    const magY = e.pageY - top - window.pageYOffset + headerHeight;
    setMagnifierXY([magX, magY]);
  };

  const getCoordinatesInPercentages = (
    xPos: number = magnifierX,
    yPos: number = magnifierY
  ): number[] => {
    return [
      Number(((xPos / imgWidth) * 100).toFixed(3)),
      Number((((yPos - headerHeight) / imgHeight) * 100).toFixed(3)),
    ];
  };

  // const getCoordinatesInPixels = (coordsInPercentage: number[]): number[] => {
  //   const [percentX, percentY] = coordsInPercentage;
  //   return [
  //     Number(((percentX * imgWidth) / 100).toFixed(3)),
  //     Number(((percentY * imgWidth) / 100 - headerHeight).toFixed(3)),
  //   ];
  // };

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
            // create character select options in drop down menu
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

      {/* draw circles around found characters
      {foundCharacterCoordinates &&
        foundCharacterCoordinates.map((coord) => {
          if (!coord) return null;
          const [foundX, foundY] = getCoordinatesInPixels(coord);
          console.log("coord", coord);

          // const [foundX, foundY] = getCoordinatesInPercentages(coord);

          return (
            <div
              key={foundX}
              className="character__found"
              style={{
                top: `${foundY}px`,
                left: `${foundX}px`,
              }}
            ></div>
          );
        })} */}
    </>
  );
};

export default GamePlay;
