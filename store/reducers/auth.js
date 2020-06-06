import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';

const initialState = {
  token: '',
  name: '',
  imageUri: '',
  didTryAutoLogin: false,
  imgHeight: '',
  imgWidth: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        name: action.name,
        imageUri: action.imageUri,
        didTryAutoLogin: true,
        imgHeight: action.imgHeight,
        imgWidth: action.imgWidth
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};
