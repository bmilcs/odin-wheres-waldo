import "./CharacterIcon.scss";
import { CharacterObject, CHARACTER_DATA } from "../../data/characterData";

interface Props {
  name: string;
}

function CharacterIcon({ name }: Props) {
  const character: CharacterObject = CHARACTER_DATA.find(
    (character) => character.name === name
  )!;

  return (
    <img
      src={character.icon}
      alt={character.name}
      className="character__icon"
    />
  );
}

export default CharacterIcon;
