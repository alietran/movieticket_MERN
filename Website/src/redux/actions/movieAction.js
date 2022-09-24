import { NewMovieAPI } from "../../api/movieAPI";
import Swal from "sweetalert2";
export const getAllMovie = () => {
  return async (dispatch) => {
    try {
      const content = await NewMovieAPI.getAllMovie();
      // console.log("result", content);
      dispatch({
        type: "GET_ALL_MOVIE",
        movie: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};
export const deleteMovie = (id) => {
  return async (dispatch) => {
    try {
      const content = await NewMovieAPI.deleteMovie(id);
      console.log("result", content);
      dispatch({
        type: "DELETE_MOVIE",
        movie: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};

export const resetMovieList = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_MOVIE_LIST",
    });
  };
};



export const createMovie = (movie) => {
  return async (dispatch) => {
    try {
      const result = await NewMovieAPI.createMovie(movie);
      console.log("result",result);
      dispatch({
        type: "CREATE_MOVIE_SUCCESS",
        movie: result.data,
      });
    } catch (error) {
      dispatch({
        type: "CREATE_MOVIE_FAIL",
        error: error.response?.data.message,
      });
    }
  };
};


export const updateMovie = (_id, movie) => {
  return async (dispatch) => {
    try {
      const result = await NewMovieAPI.updateMovie(_id, movie);
      console.log("result", result);
      dispatch({
        type: "UPDATE_MOVIE",
        movie: result.data,
      });
      console.log(result);

    } catch (error) {
      dispatch({
        type: "UPDATE_MOVIE_FAIL",
        error: error.response?.data.message,
      });
      console.log("error", error.response?.data.message);
    }
  };
};

export const getDetailMovie = (_id) => {
  return async (dispatch) => {
    try {
      const result = await NewMovieAPI.getDetailMovie(_id);
      console.log("result", result);
      dispatch({
        type: "MOVIE_DETAIL",
        movie: result.data,
      });
      // console.log(result);
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data.message);
    }
  };
};
