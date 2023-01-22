import CharacterIcon from "../../../../components/character-icon/CharacterIcon";
import uniqid from "uniqid";
import "./LevelCard.scss";
import PlayLevelButton from "../play-level-button/PlayLevelButton";
import { LevelObject } from "../../../../data/levelData";

function LevelCard({
  name,
  preview,
  description,
  characters,
  id,
}: LevelObject) {
  return (
    <article className="card">
      <img src={preview} alt={`Level of ${name}`} className="card__img" />
      <div className="card__details">
        <h4 className="card__name">{name}</h4>
        <p className="card__description">{description}</p>
        <div className="card__characters__container">
          <h5 className="card__characters__header">Find them all:</h5>
          {characters.map((name) => (
            <CharacterIcon name={name} key={uniqid()} />
          ))}
        </div>
        <PlayLevelButton url={`/level/${id}`}>Play Now</PlayLevelButton>
      </div>
    </article>
  );
}

export default LevelCard;
