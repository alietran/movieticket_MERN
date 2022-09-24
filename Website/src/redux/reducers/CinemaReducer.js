const stateDefault = {
  addCinema: null,
  cinemaList: null,
  successDelete: null,
  loadingCinema: null,
  successGetDetailCinema:null,
  successUpdateCinema: null
};

export const CinemaReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CREATE_CINEMA_SUCCESS": {
      return { ...state, addCinema: action.cinema };
    }
    case "GET_ALL_CINEMA_SUCCESS": {
      return { ...state, cinemaList: action.cinema };
    }
    case "DELETE_CINEMA_SUCCESS": {
      console.log(action);
      return {
        ...state,
        loadingCinema: true,
        successDelete: action.cinema,
      };
    }
    case "RESET_CINEMA_LIST": {
      return {
        ...state,
        successDelete: "",
        addCinema: "",
        successUpdateCinema: "",
      };
    }
    case "CINEMA_DETAIL": {
      console.log("action", action);
      return { ...state, successGetDetailCinema: action.cinema };
    }
    case "UPDATE_CINEMA": {
      console.log("action", action);
      return { ...state, successUpdateCinema: action.cinema };
    }
    default:
      return { ...state };
  }
};
