import "./CharacterIcon.scss";
import { CHARACTER_DATA } from "../../data/characterData";

interface CharacterProps {
  name: String;
}

function CharacterIcon({ name, ...props }: CharacterProps) {
  const character = CHARACTER_DATA.find((character) => character.name === name);

  return (
    <img
      src={character?.icon}
      alt={character?.name}
      className="character__icon"
      {...props}
    />
  );
}

export default CharacterIcon;
