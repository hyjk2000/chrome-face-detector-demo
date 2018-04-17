import { createActions } from 'redux-actions';

export const { setFaceDetectInterval, invalidFaceDetect } = createActions({
  SET_FACE_DETECT_INTERVAL: interval => ({ interval }),
  INVALID_FACE_DETECT: undefined
});
