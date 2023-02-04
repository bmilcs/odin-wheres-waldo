import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CharacterObject } from "../../../../data/characterData";
import LinkButton from "../../../../components/link-button/LinkButton";
import formatTime from "../../../../utils/formatTime";
import "./LevelHeader.scss";
import {
  LevelState,
  setHeaderHeight,
} from "../../../../features/level/levelSlice";

interface Props {
  characterData: Array<CharacterObject | undefined>;
  timer: number;
}

function LevelHeader({ characterData, timer }: Props) {
  const dispatch = useDispatch();
  const foundCharacters = useSelector(
    (state: { levels: LevelState }) => state.levels.characters.found.names
  );
  const headerRef = useRef<any>();

  // update header height: used to offset position magnifier to account for sticky header
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
                  // .found class lowers opacity to notify user
                  className={`${isFound ? "found" : ""} character__img`}
                  src={character.icon}
                  alt={`${character.name} Status`}
                />
              </div>
            );
          })}
        </div>

        {/* timer countdown */}
        <div className="timer">{formatTime(timer)}</div>

        {/* exit level button */}
        <LinkButton url="/">Give Up</LinkButton>
      </div>
    </section>
  );
}

export default LevelHeader;
