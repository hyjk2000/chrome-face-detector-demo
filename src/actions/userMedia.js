import { createActions } from 'redux-actions';

export const { requestUserMedia, receiveUserMedia, invalidUserMedia, registerVideoRef } = createActions({
  REQUEST_USER_MEDIA: undefined,
  RECEIVE_USER_MEDIA: undefined,
  INVALID_USER_MEDIA: undefined,
  REGISTER_VIDEO_REF: ref => (ref)
});

const fetchUserMedia = () => async dispatch => {
  dispatch(requestUserMedia());
  const mediaConstraints = {
    video: {
      width: { min: 640, ideal: 1280 },
      height: { min: 480, ideal: 720 },
      facingMode: 'user'
    },
    audio: false
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    return dispatch(receiveUserMedia(stream));
  } catch (e) {
    return dispatch(invalidUserMedia(e));
  }
};

const shouldFetchUserMedia = (state) => {
  if (state.userMedia.isFetching) return false;
  return !state.userMedia.stream;
};

export const fetchUserMediaIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchUserMedia(getState())) {
    return dispatch(fetchUserMedia());
  }
}
