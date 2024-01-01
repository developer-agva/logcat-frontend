import { USER_PASSWORD_CHANGE_REQUEST, USER_PASSWORD_CHANGE_SUCESS, USER_PASSWORD_CHANGE_FAIL } from "../types/UserConstants";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCSESS,HISTORY_DATA_SUCCESS,HISTORY_DATA_REQUEST,HISTORY_DATA_FAIL } from "../types/UserInfoConstant";

export const passwordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return {
        loading: true,
      };
    case USER_PASSWORD_CHANGE_SUCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_PASSWORD_CHANGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_SUCSESS:
      return {
        loading: false,
        data: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getHistoryDataReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_DATA_REQUEST:
      return {
        loading: true,
      };
    case HISTORY_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case HISTORY_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};