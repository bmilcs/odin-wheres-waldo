import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/button/Button";
import LinkButton from "../../../../components/link-button/LinkButton";
import {
  getLeaderboardData,
  saveToLeaderboard,
  LeaderboardEntry,
} from "../../../../firebase/firebase";
import "./GameOverModal.scss";

interface Props {
  timer: string;
  levelName: string;
  levelID: string;
}

function GameOverModal({ timer, levelName, levelID }: Props) {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    getLeaderboard();
  }, [leaderboard]);

  const getLeaderboard = async () => {
    const scores = await getLeaderboardData(levelID);
    if (!scores) return;

    const topTenScores = scores.slice(0, 10);
    setLeaderboard(topTenScores);
  };

  const onLeaderboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInputRef.current) return;

    const name = userNameInputRef.current.value;
    fieldsetRef.current!.disabled = true;

    saveToLeaderboard({ levelID: levelID, time: timer, name: name });
  };

  return (
    <div className="gameover">
      <div className="gameover__modal">
        <div className="gameover__header">
          <h2 className="gameover__title">Victory!</h2>
          <p className="gameover__para">
            You completed {levelName} in {timer}!
          </p>
        </div>

        <form className="form" onSubmit={(e) => onLeaderboardSubmit(e)}>
          <fieldset className="form__fieldset" ref={fieldsetRef}>
            <label htmlFor="userName" className="form__label">
              save your score
            </label>
            <input
              ref={userNameInputRef}
              type="text"
              id="userName"
              autoFocus
              maxLength={16}
              minLength={3}
              placeholder="nickname"
              className="form__input"
            />
            <Button className="form__button">Submit</Button>
          </fieldset>
        </form>

        <div className="leaderboard">
          <h3 className="leaderboard__header">Top Scores</h3>
          {leaderboard &&
            leaderboard.map((entry) => {
              const name = entry.name;
              const time = entry.time;
              return (
                <div className="leaderboard__entry" key={`${name}-${time}`}>
                  <p className="leaderboard__name">{name}</p>
                  <p className="leaderboard__time">{time} sec</p>
                </div>
              );
            })}
        </div>

        <LinkButton url="/">Return to Main Menu</LinkButton>
      </div>
    </div>
  );
}

export default GameOverModal;
