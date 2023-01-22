import CharacterIcon from "../../../../components/character-icon/CharacterIcon";
import uniqid from "uniqid";
import "./MapCard.scss";
import PlayMapButton from "../play-map-button/PlayMapButton";
import { MapObject } from "../../../../data/mapData";

function MapCard({ name, preview, description, characters, id }: MapObject) {
  return (
    <article className="card">
      <img src={preview} alt={`Map of ${name}`} className="card__img" />
      <div className="card__details">
        <h4 className="card__name">{name}</h4>
        <p className="card__description">{description}</p>
        <div className="card__characters__container">
          <h5 className="card__characters__header">Find them all:</h5>
          {characters.map((name) => (
            <CharacterIcon name={name} key={uniqid()} />
          ))}
        </div>
        <PlayMapButton url={`/map/${id}`}>Play Now</PlayMapButton>
      </div>
    </article>
  );
}

export default MapCard;
