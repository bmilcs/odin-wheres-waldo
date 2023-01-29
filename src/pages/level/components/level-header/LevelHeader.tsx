// header for each level
// - name
// - timer
// - character legend w/ status (found/not found)
// - quit button
import "./LevelHeader.scss";
import { useSelector } from "react-redux";
import { CharacterObject } from "../../../../data/characterData";
import { LevelState } from "../../../../features/level/levelSlice";

interface Props {
  characterData: Array<CharacterObject | undefined>;
}

function LevelHeader({ characterData }: Props) {
  const foundCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.names
  );
  const remainingCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.remaining.names
  );

  return (
    <section className="header">
      <div className="column">
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
      </div>
    </section>
  );
}

export default LevelHeader;
