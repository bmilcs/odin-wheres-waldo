import { createSlice } from "@reduxjs/toolkit";

export interface LevelState {
  id: string;
  characters: {
    remaining: {
      names: Array<string>;
      count: number;
    };
    found: {
      names: Array<string>;
      count: number;
      coordinates: number[][];
    };
  };
  timer: number;
  clickedCoordinates: Array<number>;
}

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
  timer: 0,
  clickedCoordinates: [0, 0],
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
    moveCharacterToFoundArray: (state, { payload }) => {
      const character = payload;
      // remove character from remaining names
      state.characters.remaining.names =
        state.characters.remaining.names.filter((name) => name !== character);
      // add it to found names
      state.characters.found.names.push(character);
    },
    addCoordinatesToFoundArray: (state, { payload }) => {
      state.characters.found.coordinates.push(payload);
    },
    setClickedCoordinates: (state, { payload }) => {
      state.clickedCoordinates = payload;
    },
    clearCoordinates: (state) => {
      state.clickedCoordinates = [0, 0];
    },
    updateCharacterCounts: (state) => {
      state.characters.found.count = state.characters.found.names.length;
      state.characters.remaining.count =
        state.characters.remaining.names.length;
    },
  },
});

export const {
  setLevelID,
  addCharacter,
  setClickedCoordinates,
  moveCharacterToFoundArray,
  clearCoordinates,
  updateCharacterCounts,
  addCoordinatesToFoundArray,
} = levelSlice.actions;

export default levelSlice.reducer;
