import CharacterIcon from "../character-icon/CharacterIcon";
import uniqid from "uniqid";
import "./MapCard.scss";

interface MapCardProps {
  name: string;
  preview: any;
  description: string;
  characters: Array<string>;
}

function MapCard({ name, preview, description, characters }: MapCardProps) {
  return (
    <article className="card">
      <img src={preview} alt={`Map of ${name}`} className="card__img" />
      <div className="card__details">
        <h4 className="card__name">{name}</h4>
        <p className="card__description">{description}</p>
      </div>
      <div className="card__characters">
        {characters.map((character) => (
          <CharacterIcon name={character} key={uniqid()} />
        ))}
      </div>
    </article>
  );
}

export default MapCard;
