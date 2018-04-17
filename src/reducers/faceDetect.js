import { handleAction, combineActions } from 'redux-actions';
import { setFaceDetectInterval, invalidFaceDetect } from '../actions/faceDetect'

const defaultState = {
  interval: 500,
  isFailed: false
};

export const faceDetect = handleAction(combineActions(setFaceDetectInterval, invalidFaceDetect), {
  next: (state, { payload: { interval } }) => ({ ...state, interval, isFailed: false }),
  throw: state => ({ ...state, isFailed: true }),
}, defaultState)
