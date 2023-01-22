import CharacterIcon from "../character-icon/CharacterIcon";
import uniqid from "uniqid";
import "./MapCard.scss";
import Button from "../button/Button";

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
        <div className="card__characters__container">
          <h5 className="card__characters__header">Find them all:</h5>
          {characters.map((character) => (
            <CharacterIcon name={character} key={uniqid()} />
          ))}
        </div>
        <Button>Play Now</Button>
      </div>
    </article>
  );
}

export default MapCard;
