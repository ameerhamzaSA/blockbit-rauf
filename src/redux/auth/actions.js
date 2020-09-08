import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  TWOFACTOR_CHANGE,
  TWOFACTOR_CHANGE_ERROR,
  TWOFACTOR_CHANGE_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  TWOFACTOR_GET,
  TWOFACTOR_GET_ERROR,
  TWOFACTOR_GET_SUCCESS,
  EMPTY_ERROR,
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = (resetPasswordNew) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: resetPasswordNew,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const changePassword = (data) => ({
  type: CHANGE_PASSWORD,
  payload: data,
});
export const changePasswordSuccess = (changePassSuccess) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: changePassSuccess,
});
export const changePasswordError = (message) => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: { message },
});


export const getTwoFactor = ({ history }) => ({
  type: TWOFACTOR_GET,
  payload: { history },
});
export const getTwoFactorSuccess = (data) => ({
  type: TWOFACTOR_GET_SUCCESS,
  payload: data,
});
export const getTwoFactorError = (message) => ({
  type: TWOFACTOR_GET_ERROR,
  payload: { message },
});

export const changeTwoFactor = (data) => ({
  type: TWOFACTOR_CHANGE,
  payload: data,
});
export const changeTwoFactorSuccess = (code) => ({
  type: TWOFACTOR_CHANGE_SUCCESS,
  payload: code,
});
export const changeTwoFactorError = (message) => ({
  type: TWOFACTOR_CHANGE_ERROR,
  payload: { message },
});

export const emptyErrors = (message) => ({
  type: EMPTY_ERROR,
  payload: message,
});


