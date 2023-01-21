import "./CharacterIcon.scss";
import { CHARACTER_DATA } from "../../data/characterData";

interface CharacterProps {
  name: String;
}

function CharacterIcon({ name }: CharacterProps) {
  const character = CHARACTER_DATA.find((character) => character.name === name);

  return (
    <img
      src={character?.icon}
      alt={character?.name}
      className="character__icon"
    />
  );
}

export default CharacterIcon;
