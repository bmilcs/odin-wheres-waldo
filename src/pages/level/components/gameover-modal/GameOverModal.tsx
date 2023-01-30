import LinkButton from "../../../../components/link-button/LinkButton";
import "./GameOverModal.scss";

interface Props {
  timer: number;
  levelName: string;
}

function GameOverModal({ timer, levelName }: Props) {
  return (
    <div className="gameover">
      <h2 className="gameover__header">Victory!</h2>
      <p className="gameover__para">
        Congratulations. You completed {levelName} in {timer} seconds!
      </p>
      <LinkButton url="/">Return to Main Menu</LinkButton>
    </div>
  );
}

export default GameOverModal;
