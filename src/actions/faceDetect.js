import { createActions } from 'redux-actions';

export const { setFaceDetectInterval, setShowFacialFeatures, invalidFaceDetect } = createActions({
  SET_FACE_DETECT_INTERVAL: undefined,
  SET_SHOW_FACIAL_FEATURES: undefined,
  INVALID_FACE_DETECT: undefined
});
