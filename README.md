# Odin Project #22: Where's Waldo

Welcome to Bryan Miller's Where's Waldo Project, the [twenty secondth assignment](https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app) within the Odin Project curriculum. The goal of this repo is to practice the following skill sets:

- TypeScript
- Redux Tool Kit
- React
  - Custom Hooks
  - High Order Components
- React Router DOM
- Firebase (BaaS)
  - Cloud functions
  - Firestore Database
  - User Authentication
- SASS
  - BEM naming convention

## Summary

Wow. This was a fun project. As simple as this game may seem, it included a LOT of new and unfamiliar technologies that I had to learn on the fly.

I'll begin by breaking down the folder structure:

### Folder Structure

Instead of segmenting files by their filetype (`.scss` to `styles/`), I decided to group components & their corresponding stylesheets, sub-components & functionality together:

```js
src/        // front-end logic
  index.tsx // react router dom & provider for redux toolkit store
  app/      // global scss, sets the core html & page routes: <header>, <main>
  components/  // global components used across the app: Header, Buttons, CharacterIcons etc.
  data/     // central location for level & character info data & images
  features/ // redux tool kit: global state management for core gameplay / levels
  firebase/ // direct interaction with firebase (backend as a service): initialization, cloud/async functionality
  hooks/    // custom hooks: useToggle
  pages/    // ties app together: home/ & level/ pages, with their own local components/ folder
    home/   // imports level data & creates the cards
    level/  // gameplay functionality
            // ** header:         timer/characters found & give up button
            // ** gameplay:       drop down menu, magnifying glass & game logic
            // ** gameover-modal: leaderboard display & form for saving progress
  utils/    // global functions
```

### Levels

When a user selects a level to play, the level's

Using Redux Tool Kit (`src/features/levelSlice.tsx`), state and reducers handle the game's core state & logic through reducers:

```ts
const initialState: LevelState = {
  id: "",
  characters: {
    remaining: {
      names: [],
      count: 0,
    },
    found: {
      names: [],
      coordinates: [],
      count: 0,
    },
  },
  timer: {
    value: 0,
    formatted: "",
    enabled: false,
  },
  headerHeightInPixels: 0,
  status: "active",
  clickedCoordinates: [0, 0],
};
```

### Problems Overcome

- First time using TypeScript, Redux Tool Kit, Firebase Cloud Functions

#### Redux Tool Kit: Asynchronous state updates

As I stumbled my way through learning the Redux Tool Kit, my attempts to call the `validateCharacterPosition` Firebase Cloud Function within the levelSlice reducer kept throwing an error. My goal was to update `state.chracters.remaining` & `state.characters.found` objects based on the result of the function call.

To get around this, I moved the async function call to the GamePlay React Component & handled the conditional logic there. If a character's found, it dispatches the `moveCharacterToFoundArray` reducer.

## Screenshots

> Figma Assets

![Figma Where's Waldo Assets](./screenshots/figma-assets.png)

## Links

- [Live Demo](https://bmilcs.com/odin-wheres-waldo)
- [My Odin Project Progress](https://github.com/bmilcs/odin-project)

## Deployment

```sh
# clone repo & change directories
git clone https://github.com/bmilcs/odin-wheres-waldo
cd odin-wheres-waldo

# install all dependencies
npm install

# run app
npm start
```
