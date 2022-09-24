import { NewCinemaAPI } from "../../api/cinemaAPI";
export const createCinema = (cinema) => {
  return async (dispatch) => {
    try {
      const result = await NewCinemaAPI.createCinema(cinema);
      console.log("result", result);
      dispatch({
        type: "CREATE_CINEMA_SUCCESS",
        cinema: result.data,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_CINEMA_FAIL",
        error: error.response?.data.message,
      });
    }
  };
};
export const getAllCinema = () => {
  return async (dispatch) => {
    try {
      const content = await NewCinemaAPI.getAllCinema();
      console.log("result", content);
      dispatch({
        type: "GET_ALL_CINEMA_SUCCESS",
        cinema: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const deleteCinema = (id) => {
  return async (dispatch) => {
    try {
      const content = await NewCinemaAPI.deleteCinema(id);
      console.log("result", content);
      dispatch({
        type: "DELETE_CINEMA_SUCCESS",
        cinema: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};
export const resetCinemaList = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_CINEMA_LIST",
    });
  };
};

export const updateCinema = (_id, Cinema) => {
  return async (dispatch) => {
    try {
      const result = await NewCinemaAPI.updateCinema(_id, Cinema);
      console.log("result1", result);
      dispatch({
        type: "UPDATE_CINEMA",
        cinema: result.data.content,
      });
      console.log(result);
    } catch (error) {
      dispatch({
        type: "UPDATE_CINEMA_FAIL",
        error: error.response?.data.message,
      });
      console.log("error", error.response?.data.message);
    }
  };
};

export const getDetailCinema = (_id) => {
  return async (dispatch) => {
    try {
      const result = await NewCinemaAPI.getDetailCinema(_id);
      console.log("result", result);
      dispatch({
        type: "CINEMA_DETAIL",
        cinema: result.data,
      });
      // console.log(result);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};

