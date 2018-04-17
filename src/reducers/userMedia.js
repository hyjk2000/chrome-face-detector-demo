import { handleActions } from 'redux-actions';

const defaultState = {
  isFetching: false,
  isFailed: false,
  stream: null
};

export const userMedia = handleActions({
  REQUEST_USER_MEDIA: state => ({
    ...state,
    isFetching: true,
    isFailed: false
  }),
  RECEIVE_USER_MEDIA: (state, action) => ({
    ...state,
    isFetching: false,
    isFailed: false,
    stream: action.payload
  }),
  INVALID_USER_MEDIA: state => ({
    ...state,
    isFetching: false,
    isFailed: true
  }),
  REGISTER_VIDEO_REF: (state, action) => ({
    ...state,
    videoRef: action.payload
  })
}, defaultState);
