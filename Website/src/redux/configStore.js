import { applyMiddleware, combineReducers, createStore } from "redux";


import reduxThunk from 'redux-thunk';
import { UserReducer } from "./reducers/UserReducer";
import { MovieReducer } from "./reducers/MovieReducer";
import { BookTicketReducer } from "./reducers/BookTicketReducer";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { TicketReducer } from "./reducers/TicketReducer";
import { CommentReducer } from "./reducers/CommentReducer";
import  ModalTrailerReducer  from "./reducers/ModalTrailerReducer";


// middleWareSaga.run(rootSaga);

const rootReducer = combineReducers({
  UserReducer,
  MovieReducer,
  CinemaReducer,
  BookTicketReducer,
  TicketReducer,
  ModalTrailerReducer,
  CommentReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

