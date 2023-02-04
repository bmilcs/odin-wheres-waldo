import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/button/Button";
import LinkButton from "../../../../components/link-button/LinkButton";
import formatTime from "../../../../utils/formatTime";
import {
  getLeaderboardData,
  saveToLeaderboard,
  LeaderboardEntry,
} from "../../../../firebase/firebase";
import "./GameOverModal.scss";

interface Props {
  timer: number;
  levelName: string;
  levelID: string;
}

interface LeaderboardResponse {
  added: boolean;
}

function GameOverModal({ timer, levelName, levelID }: Props) {
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);

  // get leaderboard on first render
  useEffect(() => {
    getLeaderboardTopTen();
  }, []);

  const getLeaderboardTopTen = async () => {
    const scores = await getLeaderboardData(levelID);
    if (!scores) return;
    const topTenScores = scores.slice(0, 10);
    setLeaderboard(topTenScores);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInputRef.current || !userNameInputRef.current.value) return;
    const name = userNameInputRef.current.value;
    setHasSubmittedScore(true);
    saveToLeaderboard({ levelID: levelID, time: timer, name: name }).then(
      (result) => {
        const data = result.data as LeaderboardResponse;
        if (data.added) getLeaderboardTopTen();
      }
    );
  };

  return (
    <div className="gameover">
      <div className="gameover__modal">
        <div className="gameover__header">
          <h2 className="gameover__title">Victory!</h2>
          <p className="gameover__para">
            You completed {levelName} in {formatTime(timer)}!
          </p>
        </div>

        {!hasSubmittedScore && (
          <form className="form" onSubmit={(e) => handleNameSubmit(e)}>
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
            <Button>Submit</Button>
          </form>
        )}

        <div className="leaderboard">
          <h3 className="leaderboard__header">Top Scores</h3>
          {leaderboard &&
            leaderboard.map((entry) => {
              const name = entry.name;
              const time = entry.time;
              return (
                <div className="leaderboard__entry" key={`${name}-${time}`}>
                  <p className="leaderboard__name">{name}</p>
                  <p className="leaderboard__time">{formatTime(time)}</p>
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
