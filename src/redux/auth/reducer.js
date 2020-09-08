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
  TWOFACTOR_CHANGE_ERROR,
  TWOFACTOR_CHANGE_SUCCESS,
  TWOFACTOR_CHANGE,
  TWOFACTOR_GET_ERROR,
  TWOFACTOR_GET_SUCCESS,
  TWOFACTOR_GET,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD,
  EMPTY_ERROR,
  
} from '../actions';
import { getCurrentUser } from '../../helpers/Utils';
import { isAuthGuardActive, currentUser } from '../../constants/defaultValues';

const INIT_STATE = {
  currentUser: isAuthGuardActive ? currentUser : getCurrentUser(),
  forgotUserMail: '',
  resetPasswordNew: '',
  resetPasswordCode: '',
  loading: false,
  loading2F: false,
  error: '',
  changePassSuccess: '',
  twofactorSuccess: '',
  code: '',
  qrCode: '',
  twoauth: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: '',
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordNew: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        resetPasswordNew: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case TWOFACTOR_GET_ERROR:
      return {
        ...state,
        loading2F: false,
        error: action.payload.message,
      };
    case TWOFACTOR_GET_SUCCESS:
      return {
        ...state,
        loading2F: false,
        code: action.payload.google_2fa_totp,
        twoauth: action.payload.google_2fa_status,
      };
    case TWOFACTOR_GET:
      return {
        ...state,
        loading2F: true,
        error: '',
      };
    case TWOFACTOR_CHANGE:
      return {
        ...state,
        loading2F: true,
        error: '',
      };
    case TWOFACTOR_CHANGE_SUCCESS:
      return {
        ...state,
        loading2F: false,
        twoauth: action.payload.google_2fa_status,
        code: action.payload.google_2fa_totp,
        error: '',
        twofactorSuccess: action.payload.message,
      };
    case TWOFACTOR_CHANGE_ERROR:
      return {
        ...state,
        loading2F: false,
        error: action.payload.message,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        changePassSuccess: action.payload,
        error: '',
      };
    case EMPTY_ERROR:
      return {
        ...state,
        loading: false,
        loading2F: false,
        changePassSuccess: '',
        twofactorSuccess: '',
        error: ''
      };
    default:
      return { ...state };
  }
};
