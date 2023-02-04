import wilmaIcon from "../assets/characters/wilma-icon.png";
import wilmaFullSize from "../assets/characters/wilma-full-size.png";
import waldoIcon from "../assets/characters/waldo-icon.png";
import waldoFullSize from "../assets/characters/waldo-full-size.png";
import odlawIcon from "../assets/characters/odlaw-icon.png";
import odlawFullSize from "../assets/characters/odlaw-full-size.png";
import wizardIcon from "../assets/characters/wizard-icon.png";
import wizardFullSize from "../assets/characters/wizard-full-size.png";

interface CharacterObject {
  name: string;
  icon: any;
  fullSize: any;
}

export const CHARACTER_DATA: Array<CharacterObject> = [
  {
    name: "wilma",
    icon: wilmaIcon,
    fullSize: wilmaFullSize,
  },
  {
    name: "waldo",
    icon: waldoIcon,
    fullSize: waldoFullSize,
  },
  {
    name: "wizard",
    icon: wizardIcon,
    fullSize: wizardFullSize,
  },
  {
    name: "odlaw",
    icon: odlawIcon,
    fullSize: odlawFullSize,
  },
];

export type { CharacterObject };
