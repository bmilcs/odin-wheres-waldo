# Project Planning: Rough draft

Goal: Photo tagging app

## **Overview:**

Large Photo

- Contains several small elements the user is meant to find
- User make selections for each character
- Receive feedback on whether or not they're correct

## [Waldo Solutions](https://www.howtohindi.in/2018/04/where-is-waldo-solutions-pictures-waldo.html)

## Layout

### Main Header (small)

- Page Title
- Login button (Firebase auth)

### Secondary Header (large)

Activate on Game Play mode

- Images of characters to be found in level
  - Status of character: found or not
  - Display red X over found characters
- Current Level Name
- Timer
- High Score (Current Rank)
- Exit level button

### Main

Home Page:

- Grid of 3 cards
- Each card:
  - Level Image
  - Level Name
  - Play Button
  - High Score chart
    - w/ Usernames, score
    - Cap at ~10 listings

Active Level:

- Full Scale Image (100% w & h)
- Pop-up menu, hidden by default

## Logic

**Checking if character is found**:

1. each character should have a "hit box"

- const topLeftCoord
- const bottomRightCoord
- coords: based off parent image element
- use percentages: dynamic image sizing

1. onclick (main image)

- set state: last clicked coordinates
- useEffect (pos state changed)
  - show pop-up menu
  - display list of characters w/ pictures
  - on character selection:
    - trigger a firebase cloud function to validate
    - if hit, update banner / green transparent check mark over target
    - if miss, temporary transparent red X mark

## Data Structures

Rough ideas to be 'React-ified':

```js
// Level Factory
const Level = ({name, img}) => {
  const name = name;
  const img = img;
  const characters = [];
  const addCharacter = (characterObj) => { characters.push(characterObj)}
  const isHit = (characterName, x, y) => {
    // call firebase cloud function
    // validate if found; return true/false
  }
  const isGameOver = () => {
    // loop through character objects array
    // check if all found status = true
  };
  return {
    addCharacter(),
    isFound(),
    isGameOver(),
  }
}

// Output:
const level = {
  name: "Level name",
  img: "waldo-puzzle.jpg",
  characters: [],
};
```

```js
// Character Factory
const Character = ({
  name,
  img
}) => {
  const found = false;
  const isFound = () => found ? true : false;
  const setAsFound = () => found = true;
  const getCoordinates = () => {
    // if successfully found, retrieve hit box coordinates
    // from firebase
  }

  return {
    name,
    img,
    isFound(),
    setAsFound(),
    getCoordinates()
  };
};

// Waldo Factory, etc.
const Waldo = () => {
  return Character(
    "Waldo",
    "waldo.jpg",
  );
};
```

## React State

Global

- User Signed In
- User name

Home

- ...

Level

- Characters
  - names: []
  - total count
  - found count
- Timer
- Coordinates Clicked (trigger popup)
- Popup Selection (trigger firebase)
