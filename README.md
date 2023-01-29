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

In progress...

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
