import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NewCinemaAPI } from "../../../api/cinemaAPI";
import { NewMovieAPI } from "../../../api/movieAPI";
import formatDate from "../../../utils/formatDate";
import CustomPopper from "./popper";
import useStyles from "./style";

export default function Search() {
  const { movieList } = useSelector((state) => state.MovieReducer);
  const history = useHistory();
  const movie = movieList?.movie;
  const [currentMoviePopup, setcurrentMoviePopup] = useState(null);
  console.log("movie", movie);
  const [data, setData] = useState({
    setMovie: "",
    dateShowRender: [],
    startRequest: false, // lựa chọn giữa hiện thị "đang tìm" hay "không tìm thấy"
    errorCallApi: "",

    // handleSelectRap
    setDateShow: "",
    dateShow: null,
    lichChieuPhimData: [],
    // ngày chiếu
    lichChieuPhimDataSelected: [],
    suatChieuRender: [],
    setSuatChieu: "",
    maLichChieu: "",

    setTicketPrice: "",
    ticketPriceRender: [75000, 100000, 120000, 150000],

    openCtr: {
      movie: false,
      theater: false,
      dateShow: false,
      ticketPrice: false,
      suatChieu: false,
    },
  });
  const classes = useStyles({
    openMovie: data.openCtr.movie || data.setMovie?._id,
  });

  const handleOpenMovie = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, movie: true } }));
  };
  const handleOpenDateShow = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, dateShow: true },
    }));
  };
  const handleOpenSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: true },
    }));
  };

  const handleOpenTicketPrice = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: true },
    }));
  };
  const handleCloseMovie = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, movie: false },
    }));
  };
  const handleCloseDateShow = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, dateShow: false },
    }));
  };
  const handleCloseTicketPrice = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: false },
    }));
  };
  const handleCloseSuatChieu = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, suatChieu: false },
    }));
  };

  const handleSelectMovie = (movie) => {
    if (!movie) {
      return undefined;
    }
    setData((data) => ({
      ...data,
      setMovie: movie,
      startRequest: true,
      openCtr: { ...data.openCtr, dateShow: true },
      // reset
      lichChieuPhimData: [],
      dateShowRender: [],
      setDateShow: "",
      suatChieuRender: [],
      lichChieuPhimDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
// lấy api phim
    NewMovieAPI.getDetailMovie(movie._id)
      .then((result) => {
        setData((data) => ({
          ...data,
          startRequest: false,
        }));
        const lichChieuPhimData = result.data.content.showtimes.map(
          (item, i) => {
            return { ...item };
          }
        );

        console.log("lichChieuPhimData", lichChieuPhimData);
        const dateShowRender = lichChieuPhimData.map((item) => item.dateShow);

        console.log("dateShowRender", dateShowRender);
        setData((data) => ({
          ...data,
          dateShowRender,
          lichChieuPhimData,
        }));
      })
      .catch(function (error) {
        if (error.response) {
          setData((data) => ({ ...data, errorCallApi: error.response.data }));
        } else if (error.request) {
          setData((data) => ({ ...data, errorCallApi: error.message }));
        }
      });
  };

  const handleSelectDateShow = (e) => {
    setData((data) => ({
      ...data,
      setDateShow: e.target.value,
      openCtr: { ...data.openCtr, suatChieu: true },
      // reset
      suatChieuRender: [],
      lichChieuPhimDataSelected: [],
      setSuatChieu: "",
      maLichChieu: "",
    }));
    console.log("data", data);
    const lichChieuPhimDataSelected = data.lichChieuPhimData.filter((item) => {
      // lấy tất cả item có ngày chiếu giống với ngày chiếu đã chọn
      console.log("e.target.value", e.target.value);
      console.log("formatDate(item.YyMmDd)", formatDate(item.dateShow).YyMmDd);
      if (formatDate(item.dateShow).YyMmDd === e.target.value) {
        return true;
      }
      return false;
    });
    console.log("lichChieuPhimDataSelected", lichChieuPhimDataSelected);
    const suatChieuRender = lichChieuPhimDataSelected.map((item) => {
      return item.dateShow.slice(11, 16);
    });
    console.log("suatChieuRender", suatChieuRender);

    setData((data) => ({
      ...data,
      suatChieuRender,
      lichChieuPhimDataSelected,
    }));
  };

  // input: suatChieu
  // output: setSuatChieu(suatChieu), maLichChieu(suatChieu)[maLichChieu]

  const handleSelectSuatChieu = (e) => {
    setData((data) => ({
      ...data,
      setSuatChieu: e.target.value,
      // reset
      maLichChieu: "",
    }));
    const indexMaLichChieuSelect = data.lichChieuPhimDataSelected.findIndex(
      (item) => item.dateShow.slice(11, 16) === e.target.value
    );
    console.log("indexMaLichChieuSelect", indexMaLichChieuSelect);

    const maLichChieu =
      data.lichChieuPhimDataSelected[indexMaLichChieuSelect]._id;
    console.log("maLichChieu", maLichChieu);
    setData((data) => ({ ...data, maLichChieu }));
  };
  // const handleDateAccept = () => {
  //   const openTicketPrice = data.setTicketPrice ? false : true;
  //   setData((data) => ({
  //     ...data,
  //     openCtr: { ...data.openCtr, ticketPrice: openTicketPrice },
  //   }));
  // };

  const handleSelectTicketPrice = (e) => {
    setData((data) => ({
      ...data,
      setTicketPrice: e.target.value,
    }));
    console.log("data", data);
  };

  // const handleTaoLichChieu = () => {
  //   if (loadingCreateShowtime || !isReadyTaoLichChieu) {
  //     // khi đang gửi requet hoặc chưa sẵn sàng thì không cho dispatch
  //     return;
  //   }
  //   dispatch(
  //     createShowtime({
  //       idMovie: data.setMovie,
  //       dateShow: data.dateShow,
  //       idCinema: data.idCinema,
  //       ticketPrice: data.setTicketPrice,
  //     })
  //   ); // ngayChieuGioChieu phải có định dạng dd/MM/yyyy hh:mm:ss
  //   console.log("data.dateShow", data.dateShow);
  // };

  return (
    <div className={classes.search} id="searchTickets">
      <FormControl focused={false} className={classes.itemFirst}>
        <Autocomplete
          options={movie}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => {
            // <SearchIcon />
            return (
              <TextField
                {...params}
                label="Tìm phim..."
                variant="standard"
                className={classes.textField}
              />
            );
          }}
          // renderOption={(movie) => (
          //   <CustomPopper
          //     key={movie.name}
          //     movie={movie}
          //     setNewMovie={setNewMovie}
          //     currentMoviePopup={currentMoviePopup}
          //     rootElementPopup={data.rootElementPopup}
          //   />
          // )}
          // popupIcon={<ExpandMoreIcon />}
          value={data.setMovie ? data.setMovie : null}
          onChange={(event, movie) => {
            handleSelectMovie(movie);
          }}
          classes={{
            popupIndicator: classes.popupIndicator,
            option: classes.menu__item,
            listbox: classes.listbox,
            paper: classes.paper,
            noOptions: classes.noOptions,
          }}
          open={data.openCtr.movie} // control open
          onClose={handleCloseMovie}
          onOpen={handleOpenMovie}
          blurOnSelect
          noOptionsText="Không tìm thấy"
        />
      </FormControl>

      <FormControl
        fullWidth
        className={`${classes["search__item--next"]} ${classes.search__item}`}
        focused={false}
      >
        <Select
          open={data.openCtr.dateShow}
          onClose={handleCloseDateShow}
          onOpen={handleOpenDateShow}
          onChange={handleSelectDateShow}
          value={data.setDateShow}
          renderValue={(value) => `${value ? value : "Ngày xem"}`} // hiển thị giá trị đã chọn
          displayEmpty
          // IconComponent={ExpandMoreIcon}
          // MenuProps={menuProps}
        >
          <MenuItem
            value=""
            sx={{
              display:
                data.dateShowRender?.length > 0 ? "none !important" : "block",
            }}
            classes={{ root: classes.menu__item }}
          >
            {data.setMovie
              ? `${
                  data.startRequest
                    ? data.errorCallApi
                      ? data.errorCallApi
                      : "Đang tìm ngày"
                    : "Chưa có lịch chiếu, vui lòng chọn phim khác"
                }`
              : "Vui lòng chọn phim"}
          </MenuItem>
          {data.dateShowRender.map((item) => (
            <MenuItem
              value={formatDate(item).YyMmDd} // giá trị sẽ được đẩy lên
              key={item}
              classes={{
                root: classes.menu__item,
                selected: classes["menu__item--selected"],
              }}
            >
              <div>{formatDate(item).dayToday}</div>
              <div>{formatDate(item).YyMmDd}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className={`${classes["search__item--next"]} ${classes.search__item}`}
        focused={false}
      >
        <Select
          open={data.openCtr.suatChieu}
          onClose={handleCloseSuatChieu}
          onOpen={handleOpenSuatChieu}
          onChange={handleSelectSuatChieu}
          value={data.setSuatChieu} // suatChieu
          renderValue={(value) => `${value ? value : "Suất chiếu"}`}
          displayEmpty
          // IconComponent={ExpandMoreIcon}
          // MenuProps={menuProps}
        >
          <MenuItem
            value=""
            sx={{
              display:
                data.suatChieuRender?.length > 0 ? "none !important" : "block",
            }}
            classes={{ root: classes.menu__item }}
          >
            Vui lòng chọn phim, ngày xem
          </MenuItem>
          {data.suatChieuRender.map((suatChieu) => (
            <MenuItem
              value={suatChieu}
              key={suatChieu}
              classes={{
                root: classes.menu__item,
                selected: classes["menu__item--selected"],
              }}
            >
              {suatChieu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes["search__item--next"]}>
        <Button
          disabled={!data.maLichChieu} // khi không có dữ liệu > disabled cần set true
          classes={{
            root: classes.btn,
            disabled: classes.btnDisabled,
          }}
          onClick={() =>
            history.push(
              `/checkout/${data.maLichChieu}`,
              `/checkout/${data.maLichChieu}`
            )
          }
        >
          mua vé ngay
        </Button>
      </FormControl>
    </div>
  );
}
