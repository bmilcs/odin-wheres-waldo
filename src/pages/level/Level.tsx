import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CHARACTER_DATA } from "../../data/characterData";
import { LevelObject } from "../../data/levelData";
import {
  addCharacter,
  setLevelID,
  resetLevel,
  LevelState,
  startTimer,
  incrementTimer,
  stopTimer,
} from "../../features/level/levelSlice";
import GamePlay from "./components/gameplay/GamePlay";
import LevelHeader from "./components/level-header/LevelHeader";
import "./Level.scss";

function Level(props: LevelObject) {
  const dispatch = useDispatch();
  const { characters, id, fullSize } = props;
  const timer = useSelector(
    (state: { levels: LevelState }) => state.levels.timer.value
  );
  const timerEnabled = useSelector(
    (state: { levels: LevelState }) => state.levels.timer.enabled
  );
  const remainingCharacterCount = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.remaining.count
  );

  // retrieve character objects from their name
  const characterData = characters.map((name) => {
    return CHARACTER_DATA.find((char) => char.name === name);
  });

  // on first render, initialize state values in level slice
  // with level data passed in from props
  useEffect(() => {
    dispatch(setLevelID(id));
    dispatch(addCharacter(characters));
    dispatch(resetLevel());
    dispatch(startTimer());
  }, []);

  // watch for timerEnabled state value changes & begin interval when set to true
  useEffect(() => {
    let timer: number | null = null;
    if (timerEnabled) {
      console.log("enabling timer");
      timer = window.setInterval(() => dispatch(incrementTimer()), 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerEnabled]);

  // end game when remaining character count = 0
  useEffect(() => {
    if (!timerEnabled || remainingCharacterCount !== 0) return;
    // ! TODO: on victory, display modal w/ total time & restart/return to main menu
    dispatch(stopTimer());
  }, [remainingCharacterCount, timerEnabled]);

  return (
    <>
      <LevelHeader characterData={characterData} timer={timer} />
      <GamePlay id={id} image={fullSize} characterData={characterData} />
    </>
  );
}

export default Level;
