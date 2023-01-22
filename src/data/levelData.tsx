import hollywoodPreview from "../assets/levels/hollywood-preview.png";
import hollywoodFullsize from "../assets/levels/hollywood.jpg";
import slopesPreview from "../assets/levels/slopes-preview.png";
import slopesFullSize from "../assets/levels/slopes.jpg";
import spacePreview from "../assets/levels/space-preview.png";
import spaceFullSize from "../assets/levels/space.jpg";

interface LevelObject {
  name: string;
  characters: Array<string>;
  preview: any;
  fullSize: any;
  description: string;
  id: string;
}

interface LevelArray extends Array<LevelObject> {}

export const LEVEL_DATA: LevelArray = [
  {
    id: "hollywood",
    name: "Hollywood, USA",
    characters: ["waldo", "wilma", "wizard", "odlaw"],
    description:
      "The Hollywood, USA map is a glitzy and glamorous adventure! Join Waldo and his friends as they take a stroll down the famous Hollywood Boulevard. But don't let the star-studded atmosphere fool you, they're hiding amongst the crowds and the bright lights. Can you spot them all? It's a fun and exciting way to test your observation skills and discover the hidden gems of Hollywood!",
    preview: hollywoodPreview,
    fullSize: hollywoodFullsize,
  },
  {
    id: "andes",
    name: "Andes Mountains, Chile",
    characters: ["waldo", "wilma", "wizard", "odlaw"],
    description:
      "The Where's Waldo Andes Mountain Ski puzzle is an exciting adventure through the snowy peaks of the Andes! Join Waldo and his friends as they ski, snowboard, and play in the resort. But be careful, they're hiding amongst the hustle and bustle. Can you spot them all? It's a fun and challenging way to test your observation skills while having a great time!",
    preview: slopesPreview,
    fullSize: slopesFullSize,
  },
  {
    id: "moon",
    name: "Picard Crater, the Moon",
    characters: ["waldo", "wilma", "wizard", "odlaw"],
    description:
      "The Picard Crater, the Moon map is an out-of-this-world adventure! Join Waldo and his friends as they explore the lunar landscape of the Picard Crater. But they're not alone, they're hiding amongst the rocky terrain and strange lunar objects. Can you spot them all? It's a fun and exciting challenge to test your observation skills and explore the mysterious world of the Moon!",
    preview: spacePreview,
    fullSize: spaceFullSize,
  },
];

export type { LevelArray, LevelObject };
