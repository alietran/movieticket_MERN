import { NewUserAPI } from "../../api/userAPI";
import Swal from "sweetalert2";
import { LOGIN } from "../constants/constant";
export const userInfo = (user) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.login(user);
      dispatch({
        type: LOGIN,
        user: result.data.data.user,
        token: result.data.token,
      });

      Swal.fire({
        position: "center",
        width: 400,
        icon: "success",
        title: "Đăng nhập thành công!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đăng nhập thất bại!",
      });
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};

export const userInfoRegis = (user) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.register(user);
      dispatch({
        type: "REGISTER_REQUEST",
      });

      dispatch({
        type: "REGISTER",
        user: result.data,
      });
      Swal.fire({
        position: "center",
        width: 400,
        icon: "success",
        title: "Đăng ký tài khoản thành công!",
        timer: 2000,
      });
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Đăng ký tài khoản thất bại!",
      // });
      
      dispatch({
        type: "REGISTER_FAIL",
        error: error.response?.data.message,
      });
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.getAllUser();
      console.log("result", result);
      dispatch({
        type: "GET_ALL_USER",
        user: result.data.data.user,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const deletelUser = (id) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.deleteUser(id);
      // console.log("result", result);
      dispatch({
        type: "DELETE_USER",
        user: result.data.data,
        
      });
      //   Lay lai ds USER
      dispatch(getAllUser());
    } catch (error) {
      console.log("req.response", error.response);
        // dispatch({
        //   type: "DELETE_USER_FAIL",
        //  message: error.response.data.messages
        // });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.messages,
      });
    }
  };
};

export const changePassword = (user) => {
  return async (dispatch) => {
    try {
      console.log("user123")
      const result = await NewUserAPI.changePass(user);
      console.log("result", result);
      dispatch({
        type: "CHANGE_PASSWORD",
        userPass: result.data.data.user,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đổi mật khẩu thành công",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đổi mật khẩu thất bại!",
      });
    }
  };
};

export const updateUserAdmin = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQUEST",
      });
      const result = await NewUserAPI.updateUserAdmin(user);
      console.log("result", result);
      dispatch({
        type: "UPDATE_USER_ADMIN",
        user: result.data.data.user,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "cập nhật thành công",
        timer: 2000,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_ADMIN_FAIL",
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cập nhật thất bại!",
      });
    }
  };
};

export const getDetailUser = (_id) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.getDetailUser(_id);
      console.log("result", result);
      dispatch({
        type: "USER_DETAIL",
        user: result.data.content,
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};
export const updateUser = (_id, user) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.updateUser(_id, user);
      console.log("result", result);
      dispatch({
        type: "UPDATE_USER",
        user: result.data.content,
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};

export const updateMe = ( user) => {
  return async (dispatch) => {
    try {
      const result = await NewUserAPI.updateMe(user);
      console.log("result", result);
      dispatch({
        type: "UPDATE_ME",
        user: result.data.data.user,
        status: result.data.status
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};

export const resetUpdateUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_USER_UPDATE",
    });
  };
};

export const resetUpdate= () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_UPDATE",
    });
  };
};


export const resetUserList = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_USER_LIST",
    });
  };
};
export const resetDeleteUser = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_USER_DELETE",
    });
  };
};
