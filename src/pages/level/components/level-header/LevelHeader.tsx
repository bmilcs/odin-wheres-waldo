import "./LevelHeader.scss";
import { useSelector } from "react-redux";
import { CharacterObject } from "../../../../data/characterData";
import {
  LevelState,
  setHeaderHeight,
} from "../../../../features/level/levelSlice";
import LinkButton from "../../../../components/link-button/LinkButton";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

interface Props {
  characterData: Array<CharacterObject | undefined>;
  timer: string;
}

function LevelHeader({ characterData, timer }: Props) {
  const dispatch = useDispatch();
  const foundCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.names
  );

  const headerRef = useRef<any>();

  useEffect(() => {
    if (headerRef.current !== null)
      dispatch(setHeaderHeight(headerRef.current.offsetHeight));
  }, []);

  return (
    <section className="header" ref={headerRef}>
      <div className="column">
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

        {/* timer countdown */}
        <div className="timer">{timer}</div>

        {/* exit level button */}
        <LinkButton url="/">Give Up</LinkButton>
      </div>
    </section>
  );
}

export default LevelHeader;
