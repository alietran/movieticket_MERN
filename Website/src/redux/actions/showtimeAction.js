import { bookingApi } from "../../api/showtimeAPI";
export const createShowtime = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CREATE_SHOWTIME_REQUEST",
      });
      const result = await bookingApi.postCreateShowTimes(data);
      dispatch({
        type: "CREATE_SHOWTIME_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "CREATE_SHOWTIME_FAIL",
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};
export const getAllShowtime = () => {
  return async (dispatch) => {
    try {
      const content = await bookingApi.getAllShowtime();
      // console.log("result", content);
      dispatch({
        type: "GET_ALL_SHOWTIME_SUCCESS",
        showtime: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const resetCreateShowtime = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_CREATE_SHOWTIME",
    });
  };
};

export const deleteShowtime = (id) => {
  return async (dispatch) => {
    try {
      const content = await bookingApi.deleteShowTimes(id);
      console.log("content", content);
      dispatch({
        type: "DELETE_SHOWTIME_SUCCESS",
        showtime: content.data.showtime,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const getDetailShowtime = (_id) => {
  return async (dispatch) => {
    try {
      const content = await bookingApi.getDetailShowtime(_id);
      console.log("result123", content);
      dispatch({
        type: "GET_LISTSEAT_SUCCESS",
        showtime: content.data.showtime,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const postCreateTicket = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "BOOK_TICKET_REQUEST",
      });
      const content = await bookingApi.postCreateTicket(data);
      console.log("result", content);
      dispatch({
        type: "BOOK_TICKET_SUCCESS",
        data: content.data,
      });
    } catch (error) {
      dispatch({
        type: "BOOK_TICKET_FAIL",
        payload: {
          error: error.response?.data ? error.response.data : error.message,
        },
      });
    }
  };
};
export const updateShowtime = (_id, data) => {
  return async (dispatch) => {
    try {
      const result = await bookingApi.updateShowtime(_id, data);
      console.log("result1", result);
      dispatch({
        type: "UPDATE_SHOWTIME",
        showtime: result.data.content,
      });
      console.log(result);
    } catch (error) {
      dispatch({
        type: "UPDATE_SHOWTIME_FAIL",
        error: error.response?.data.message,
      });
      console.log("error", error.response?.data.message);
    }
  };
};