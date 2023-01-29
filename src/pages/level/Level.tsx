import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CHARACTER_DATA } from "../../data/characterData";
import { LevelObject } from "../../data/levelData";
import { addCharacter, setLevelID } from "../../features/level/levelSlice";
import GamePlay from "./components/gameplay/GamePlay";
import LevelHeader from "./components/level-header/LevelHeader";
import "./Level.scss";

function Level(props: LevelObject) {
  const dispatch = useDispatch();
  const { characters, id, fullSize } = props;
  const characterData = characters.map((name) => {
    return CHARACTER_DATA.find((char) => char.name === name);
  });

  // on first render, initialize state values in level slice
  // with level data passed in from props
  useEffect(() => {
    dispatch(setLevelID(id));
    dispatch(addCharacter(characters));
  }, []);

  return (
    <>
      <LevelHeader />
      <GamePlay id={id} image={fullSize} characterData={characterData} />
    </>
  );
}

export default Level;
