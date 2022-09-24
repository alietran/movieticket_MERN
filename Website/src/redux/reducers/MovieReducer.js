const stateDefault = {
  movieList: null,
  loadingDeleteMovie: null,
  successDelete: null,
  loadingAddmovie: null,
  addMovie: null,
  successUpdateMovie: null,
  successGetDetailMovie: null,
};

export const MovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_ALL_MOVIE": {
      return { ...state, movieList: action.movie };
    }
    case "DELETE_MOVIE": {
      console.log(action);
      return {
        ...state,
        loadingDeleteMovie: true,
        successDelete: action.movie,
      };
    }
    case "RESET_MOVIE_LIST": {
      return {
        ...state,
        successDelete: "",
        addMovie: "",
        successUpdateMovie: "",
      };
    }

    case "CREATE_MOVIE_SUCCESS": {
      console.log("action", action);
      return { ...state, addMovie: action.movie };
    }
    case "MOVIE_DETAIL": {
      console.log("action", action);
      return { ...state, successGetDetailMovie: action.movie };
    }

    case "UPDATE_MOVIE": {
      console.log("action", action);
      return { ...state, successUpdateMovie: action.movie };
    }

    default:
      return { ...state };
  }
};
