import "./LevelHeader.scss";
import { useSelector } from "react-redux";
import { CharacterObject } from "../../../../data/characterData";
import { LevelState } from "../../../../features/level/levelSlice";
import LinkButton from "../../../../components/link-button/LinkButton";

interface Props {
  characterData: Array<CharacterObject | undefined>;
  timer: number;
}

function LevelHeader({ characterData, timer }: Props) {
  const foundCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.names
  );

  return (
    <section className="header">
      <div className="column">
        {/* timer countdown */}
        <div className="timer">{timer}</div>

        {/* character found status */}
        <div className="statuses">
          {characterData.map((character) => {
            if (!character || !character.icon) return null;
            const isFound = foundCharacters.includes(character.name);
            return (
              <div className="character" key={character.name}>
                <img
                  className={`${isFound ? "found" : ""} character__img`}
                  src={character.icon}
                  alt={`${character.name} Status`}
                />
              </div>
            );
          })}
        </div>

        {/* exit level button */}
        <LinkButton url="/">Give Up</LinkButton>
      </div>
    </section>
  );
}

export default LevelHeader;
