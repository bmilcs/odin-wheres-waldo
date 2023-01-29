import { createSlice } from "@reduxjs/toolkit";
import { validateCharacterPosition } from "../../firebase/firebase";

interface LevelState {
  id: string | null;
  characters: {
    remaining: {
      names: Array<string>;
      count: number;
    };
    found: {
      names: Array<string>;
      count: number;
    };
  };
  timer: number;
  clickedCoordinates: Array<number> | null;
}

interface ValidateCharacterPositionResults {
  isFound: boolean;
  characterName: string;
  levelID: string;
}

const initialState: LevelState = {
  id: null,
  characters: {
    remaining: {
      names: [],
      count: 0,
    },
    found: {
      names: [],
      count: 0,
    },
  },
  timer: 0,
  clickedCoordinates: null,
};

export const levelSlice = createSlice({
  name: "levels",
  initialState: initialState,
  reducers: {
    setLevelID: (state, { payload }) => {
      state.id = payload;
    },
    addCharacter: (state, { payload }) => {
      state.characters.remaining.names = payload;
      state.characters.remaining.count = payload.length;
    },
    isCharacterFound: (state, { payload }) => {
      validateCharacterPosition({
        characterName: payload,
        coordinates: state.clickedCoordinates,
        levelID: state.id,
      })
        .then((res) => {
          const data = res.data as ValidateCharacterPositionResults;
          const isFound = data.isFound as boolean;
          const character = data.characterName;

          if (isFound) {
            const newRemainingCharacters =
              state.characters.remaining.names.filter(
                (name) => name !== character
              );
            state.characters.remaining.names = newRemainingCharacters;
          }
          console.log("isFound", isFound);
          console.log("character", character);
        })
        .catch((e) => console.log(e));
    },
    setClickedCoordinates: (state, { payload }) => {
      state.clickedCoordinates = payload;
    },
    clearCoordinates: (state) => {
      state.clickedCoordinates = null;
    },
  },
});

export const {
  setLevelID,
  addCharacter,
  setClickedCoordinates,
  isCharacterFound,
  clearCoordinates,
} = levelSlice.actions;

export default levelSlice.reducer;
