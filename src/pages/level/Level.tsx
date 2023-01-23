import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
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

  // on first render, initialize state values in level slice
  // with level data passed in from props
  useEffect(() => {
    dispatch(setLevelID(name));
    dispatch(addCharacter(characters));
  }, []);

  return (
    <>
      <LevelHeader />
      <GamePlay image={fullSize} />
    </>
  );
}

export default Level;
