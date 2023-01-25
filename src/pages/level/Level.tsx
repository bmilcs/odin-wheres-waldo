import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { CHARACTER_DATA } from "../../data/characterData";
import { LevelObject } from "../../data/levelData";
import { addCharacter, setLevelID } from "../../features/level/levelSlice";
import GamePlay from "./components/gameplay/GamePlay";
import LevelHeader from "./components/level-header/LevelHeader";
import "./Level.scss";

function Level({
  id,
  name,
  characters,
  preview,
  fullSize,
  description,
}: LevelObject) {
  const level = useSelector((state: RootState) => state.levels);
  const dispatch = useDispatch();
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
      <GamePlay image={fullSize} characterData={characterData} />
    </>
  );
}

export default Level;
