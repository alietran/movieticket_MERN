// import { OPEN_MODAL, CLOSE_MODAL } from "./constants/ModalTrailer";

const initialState = {
  open: false,
  urlYoutube: "",
};

const ModalTrailerReducer = (state = initialState, action) => {
  switch (action.type) {
      
    case "OPEN_MODAL": {
       console.log("1234", action.payload.urlYoutube);
      return {
        open: action.payload.open,
        urlYoutube: action.payload.urlYoutube,
      };
    }
    case "CLOSE_MODAL": {
      return { open: action.payload.open, urlYoutube: "" };
    }
    default:
      return state;
  }
};
export default ModalTrailerReducer;
