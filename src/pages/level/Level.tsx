import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  gameOver,
} from "../../features/level/levelSlice";
import GameOverModal from "./components/gameover-modal/GameOverModal";
import GamePlay from "./components/gameplay/GamePlay";
import LevelHeader from "./components/level-header/LevelHeader";
import "./Level.scss";

function Level({ characters, id, fullSize, name }: LevelObject) {
  const dispatch = useDispatch();
  const time = useSelector(
    (state: { levels: LevelState }) => state.levels.timer.value
  );
  const timerEnabled = useSelector(
    (state: { levels: LevelState }) => state.levels.timer.enabled
  );
  const remainingCharacterCount = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.remaining.count
  );
  const gameStatus = useSelector(
    (state: { levels: LevelState }) => state.levels.status
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

  // on timerEnabled changes, start or stop the timer
  useEffect(() => {
    let timer: number | null = null;
    if (timerEnabled) {
      timer = window.setInterval(() => dispatch(incrementTimer()), 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerEnabled]);

  // when the final character is found, handle victory
  // gameOver() sets gameStatus to "complete" in levelSlice
  useEffect(() => {
    if (!timerEnabled || remainingCharacterCount !== 0) return;
    dispatch(stopTimer());
    dispatch(gameOver());
  }, [remainingCharacterCount, timerEnabled]);

  return (
    <>
      <LevelHeader characterData={characterData} timer={time} />
      <GamePlay id={id} image={fullSize} characterData={characterData} />
      {gameStatus === "complete" && (
        <GameOverModal timer={time} levelName={name} levelID={id} />
      )}
    </>
  );
}

export default Level;
