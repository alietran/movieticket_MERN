import {
  CHANGE_PASSWORD,
  DELETE_USER,
  GET_ALL_USER,
  LOGIN,
  REGISTER,
} from "../constants/constant";

// Quản lý ng dùng
const userLogin = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const stateDefault = {
  userLogin: userLogin,
  userRegister: null,
  userList: null,
  userUpdate: null,
  loadingUpdate: false,
  loadingRegis: false,
  successDetailUser: null,
  failRegis: null,
  faileUpdate: null,
  updateMeHome: null,
  loadingUpdateInfo: null,
  userDeleted: null,

};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      const { user, token } = action;
      // console.log(action);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { ...state, userLogin: user };
    }
    case "REGISTER_REQUEST": {
      return { ...state, loadingRegis: true };
    }
    case REGISTER: {
      return { ...state, userRegister: action.user, loadingRegis: false };
    }
    case "REGISTER_FAIL": {
      return { ...state, loadingRegis: false, failRegis: action.error };
    }
    case GET_ALL_USER: {
      const { user } = action;
      return { ...state, userList: user };
    }
    case "DELETE_USER": {
      const { user } = action;
      return { ...state, userList: user, userDeleted: true };
    }
    case "CHANGE_PASSWORD": {
      console.log("userLogin123", userLogin);
      return { ...state, userLogin: action.userPass };
    }
    case "USER_DETAIL": {
      console.log("action", action);
      return { ...state, successDetailUser: action.user };
    }

    case "UPDATE_USER_REQUEST": {
      return { ...state, loadingUpdate: true };
    }
    case "UPDATE_USER_ADMIN": {
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, userLogin: action.user, loadingUpdate: false };
    }
    case "UPDATE_USER_ADMIN_FAIL": {
      return { ...state, loadingUpdate: false, faileUpdate: action.error };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        userUpdate: action.user,
      };
    }

    case "RESET_USER_UPDATE": {
      return { ...state, userUpdate: "" };
    }

    case "RESET_USER_LIST": {
      return { ...state, userUpdate: "" };
    }
    case "RESET_UPDATE": {
      return { ...state, successDetailUser: "" };
    }
    case "RESET_USER_DELETE": {
      return { ...state, userDeleted: "" };
    }

    case "LOGOUT": {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...state, userLogin: "" };
    }
    // NG DÙNG
    case "UPDATE_ME": {
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        userLogin: action.user,
        loadingUpdateInfo: action.status,
      };
    }
    // case "DELETE_USER_FAIL": {

    // }
    default:
      return { ...state };
  }
};
