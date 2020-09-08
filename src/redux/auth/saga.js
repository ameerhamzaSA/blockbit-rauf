import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  TWOFACTOR_GET,
  TWOFACTOR_CHANGE,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  changePasswordError,
  changePasswordSuccess,
  getTwoFactorError,
  getTwoFactorSuccess,
  changeTwoFactorSuccess,
  changeTwoFactorError,
} from './actions';

import RestApi from '../../helpers/axios';

import { adminRoot, currentUser } from '../../constants/defaultValues';
import { setCurrentUser, capF } from '../../helpers/Utils';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password, twoFactorCode) => {
  let api = new RestApi();
  return await api.post('login', {
    email: email,
    password: password,
    google_2fa_code: twoFactorCode,
  });
};

function* loginWithEmailPassword({ payload }) {
  const { email, password, twoFactorCode } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(
      loginWithEmailPasswordAsync,
      email,
      password,
      twoFactorCode
    );
    if (!loginUser.error) {
      loginUser.data.user.tokenTime = new Date();
      const item = { token: loginUser.data.token, ...loginUser.data.user };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(loginUserError(capF(loginUser.data.message)));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  let api = new RestApi();
  return await api.post('password/email', {
    email: email,
  });
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus.error) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(capF(forgotPasswordStatus.data.message)));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  let api = new RestApi();
  return await api.post(
    'password/reset',
    {
      password: newPassword,
      password_confirmation: newPassword,
    },
    {
      Authorization: `${resetPasswordCode}`,
    }
  );
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode, history } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus.error) {
      yield put(resetPasswordSuccess('success'));
      setTimeout(() => {
        history.push('/');
      }, 1000);
    } else {
      yield put(resetPasswordError(resetPasswordStatus.data.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

// ****************** CHANGE PASSWORD *************** //

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

const changePasswordAsync = async (oldPassword, newPassword, newPassAgain) => {
  let auth = JSON.parse(await localStorage.getItem('current_user'));
  let api = new RestApi();
  return await api.post(
    'password/change',
    {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: newPassAgain,
    },
    {
      Authorization: auth.token,
    }
  );
};

function* changePassword({ payload }) {
  const { oldPassword, newPassword, newPassAgain, history } = payload;
  try {
    const changePass = yield call(
      changePasswordAsync,
      oldPassword,
      newPassword,
      newPassAgain
    );
    if (!changePass.error) {
      yield put(changePasswordSuccess(capF(changePass.data.message)));
    } else {
      yield put(changePasswordError(capF(changePass.data.message)));
    }
  } catch (error) {
    yield put(changePasswordError(error));
  }
}

// ****************** TWO FACTOR AUTH *************** //

export function* watchGetTwoFactor() {
  yield takeEvery(TWOFACTOR_GET, getTwoFactor);
}

const getTwoFactorAsync = async () => {
  let auth = JSON.parse(await localStorage.getItem('current_user'));
  let api = new RestApi();
  return await api.get('user/2fa', {
    Authorization: auth.token,
  });
};

function* getTwoFactor() {
  try {
    const response = yield call(getTwoFactorAsync);
    if (!response.error) {
      yield put(getTwoFactorSuccess(response.data));
    } else {
      yield put(getTwoFactorError(capF(response.data.message)));
    }
  } catch (error) {
    yield put(getTwoFactorError(error));
  }
}

export function* watchSubmitTwoFactor() {
  yield takeEvery(TWOFACTOR_CHANGE, submitTwoFactor);
}

const submitTwoFactorAsync = async (code) => {
  let auth = JSON.parse(await localStorage.getItem('current_user'));
  let api = new RestApi();
  return await api.post(
    'user/2fa',
    {
      google_2fa_code: parseInt(code),
    },
    {
      Authorization: auth.token,
    }
  );
};

function* submitTwoFactor({ payload }) {
  const { authCode, history } = payload;
  try {
    const response = yield call(submitTwoFactorAsync, authCode);
    if (!response.error) {
      yield put(changeTwoFactorSuccess(response.data));
    } else {
      yield put(getTwoFactorError(capF(response.data.message)));
    }
  } catch (error) {
    yield put(getTwoFactorError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchChangePassword),
    fork(watchGetTwoFactor),
    fork(watchSubmitTwoFactor),
  ]);
}
