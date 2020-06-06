export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';


export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (token, name, imageUri, imgHeight, imgWidth) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, token: token, name : name, imageUri: imageUri
      ,imgHeight: imgHeight,imgWidth : imgWidth  });
  };
};