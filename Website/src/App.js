import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useMemo } from "react";
import "./App.css";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";

import { createBrowserHistory } from "history";
import Account from "./pages/Admin/Profile/Account.jsx";
import EditRole from "./pages/Admin/Profile/EditRole";
import UserManager from "./pages/Admin/UserManager/UserManager";
import ListMovie from "./pages/Admin/Movie/ListMovie";
import CreateMovie from "./pages/Admin/Movie/CreateMovie";
import Ticket from "./pages/Admin/Ticket/Ticket";

import UpdateMovie from "./pages/Admin/Movie/UpdateMovie";
import UpdateCinema from "./pages/Admin/Cinema/UpdateCinema";
import UpdateShowtime from "./pages/Admin/Showtime/UpdateShowtime";
import CreateCinema from "./pages/Admin/Cinema/CreateCinema";
import CinemaList from "./pages/Admin/Cinema/CinemaList";
import ShowtimeList from "./pages/Admin/Showtime/ShowtimeList";
import CreateShowtime from "./pages/Admin/Showtime/CreateShowtime";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomeInfo from "./pages/HomeInfo/HomeInfo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";
import componentsOverride from "./theme/overrides";
import MovieDetail from "./pages/MovieDetail";
import BookTicket from "./pages/Bookticket";
import ModalTrailer from "./components/ModalTrailer/ModalTrailer";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/guard/Profile";


// import ShowtimeList from "./pages/Admin/ShowTime/ShowtimeList.jsx";

export const history = createBrowserHistory;

function App() {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );



  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ModalTrailer />
          <Switch>
            <HomeTemplate exact path="/movie/:id" Component={MovieDetail} />
            <Route exact path="/checkout/:id" component={BookTicket} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <AdminTemplate exact path="/admin/users" Component={UserManager} />
            <AdminTemplate
              exact
              path="/admin/users/account"
              Component={Account}
            />
            <AdminTemplate
              exact
              path="/admin/users/account/edit"
              Component={EditRole}
            />
            <AdminTemplate
              exact
              path="/admin/movie/listMovie"
              Component={ListMovie}
            />
            <AdminTemplate
              exact
              path="/admin/movie/createMovie"
              Component={CreateMovie}
            />
            <AdminTemplate
              exact
              path="/admin/movie/edit"
              Component={UpdateMovie}
            />
            <AdminTemplate
              exact
              path="/admin/cinema/createCinema"
              Component={CreateCinema}
            />
            <AdminTemplate
              exact
              path="/admin/cinema/cinemaList"
              Component={CinemaList}
            />
            <AdminTemplate
              exact
              path="/admin/cinema/edit"
              Component={UpdateCinema}
            />
            <AdminTemplate
              exact
              path="/admin/showtime/ShowtimeList"
              Component={ShowtimeList}
            />

            <AdminTemplate
              exact
              path="/admin/showtime/createShowtime"
              Component={CreateShowtime}
            />
            <AdminTemplate
              exact
              path="/admin/showtime/edit/:id"
              Component={UpdateShowtime}
            />
            <AdminTemplate
              exact
              path="/admin/ticket/ticketList"
              Component={Ticket}
            />
            <HomeTemplate exact path="/" Component={HomePage} />
            <HomeTemplate
              // {/* <Route exact path="/" Component={HomePage} /> */}
              exact
              path="/user"
              Component={Profile}
            />

            {/* <HomeTemplate exact path="/" Component={HomePage} />
          <HomeTemplate exact path="/user" Component={HomeInfo} /> */}
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
