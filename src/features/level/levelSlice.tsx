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
  timer: {
    value: number;
    enabled: boolean;
  };
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
  timer: {
    value: 0,
    enabled: false,
  },
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
    resetLevel: (state) => {
      state.characters.found.names = [];
      state.timer.value = 0;
      state.timer.enabled = false;
      updateCharacterCounts();
    },
    startTimer: (state) => {
      state.timer.enabled = true;
    },
    stopTimer: (state) => {
      state.timer.enabled = false;
    },
    incrementTimer: (state) => {
      state.timer.value += 1;
    },
    gameOver: (state) => {
      state.timer.enabled = false;
    },
  },
});

export const {
  addCharacter,
  addCoordinatesToFoundArray,
  clearCoordinates,
  moveCharacterToFoundArray,
  resetLevel,
  setClickedCoordinates,
  setLevelID,
  updateCharacterCounts,
  startTimer,
  stopTimer,
  gameOver,
  incrementTimer,
} = levelSlice.actions;

export default levelSlice.reducer;
