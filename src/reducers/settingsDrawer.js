import { handleActions } from "redux-actions";

const defaultState = {
  open: false
};

export const settingsDrawer = handleActions(
  {
    TOGGLE_SETTINGS_DRAWER: (state, action) => ({
      ...state,
      open: action.payload
    }),
  },
  defaultState
);
