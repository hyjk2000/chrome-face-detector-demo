import { handleActions } from 'redux-actions';

const defaultState = {
  interval: 500,
  showFacialFeatures: false,
  isFailed: false
};

export const faceDetect = handleActions({
  SET_FACE_DETECT_INTERVAL: (state, action) => ({
    ...state,
    interval: action.payload,
    isFailed: false
  }),
  SET_SHOW_FACIAL_FEATURES: (state, action) => ({
    ...state,
    showFacialFeatures: action.payload,
    isFailed: false
  }),
  INVALID_FACE_DETECT: state => ({
    ...state,
    isFailed: true
  })
}, defaultState);
