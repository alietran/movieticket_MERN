import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Stack,
  Grid,
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie, resetMovieList } from "../../../redux/actions/movieAction";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
// import { getAllShowtime } from "../../../redux/actions/showtimeAction";
import { cinemaAPI, NewCinemaAPI } from "../../../api/cinemaAPI";
import {
  createShowtime,
  resetCreateShowtime,
  getAllShowtime,
  updateShowtime
} from "../../../redux/actions/showtimeAction";
import { deleteShowtime, getDetailShowtime } from "../../../redux/actions/showtimeAction";
import moment from "moment";
export default function UpdateShowtimes(props) {
   const { id } = props.match.params;
  const { loadingCreateShowtime, successCreateShowtime,successDetailShowtime,successUpdateShowtime, errorCreateShowtime } =
    useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const {  showtimeList } = useSelector((state) => state.BookTicketReducer);
  const { movieList } = useSelector((state) => state.MovieReducer);
  var formatDateShow = moment(successDetailShowtime?.dateShow)
                    .add(0, "hours")
                    .format("MM/DD/YYYY hh:mm A");
  const [selectedDate, setSelectedDate] = useState(formatDateShow);
  const { enqueueSnackbar } = useSnackbar();
  console.log("dateShow", moment(successDetailShowtime?.dateShow)
                    .add(0, "hours")
                    .format("MM/DD/YYYY hh:mm A"))
               
  const [data, setData] = useState({
    setMovie: successDetailShowtime?.idMovie._id,
    theaterRender: [],
    setTheater: successDetailShowtime?.idCinema.name,
    dateShow: formatDateShow,
    setTicketPrice:  successDetailShowtime?.ticketPrice,
    ticketPriceRender: [75000, 100000, 120000, 150000],
    startRequest: false, // lựa chọn giữa hiện thị "đang tìm" hay "không tìm thấy"
    openCtr: {
      movie: false,
      theater: false,
      dateShow: false,
      ticketPrice: false,
    },
  });
  console.log("data",data);
  const [isReadyTaoLichChieu, setIsReadyTaoLichChieu] = useState(false);

  useEffect(() => {
    if (data.setMovie && data.dateShow && data.idCinema && data.setTicketPrice)
      setIsReadyTaoLichChieu(true);
    else setIsReadyTaoLichChieu(false);
  }, [data.setMovie, data.dateShow, data.idCinema, data.setTicketPrice]);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/getting-started/installation/"
    >
      Lịch chiếu
    </Link>,
    <Typography key="3" color="text.primary">
      Lịch chiếu mới
    </Typography>,
  ];

  useEffect(() => {
    // get list user lần đầu
    if (!movieList) {
      dispatch(getAllMovie());
    }
    // return () => dispatch(resetMovieList());
  }, []);
  useEffect(() => {
    // get list user lần đầu
    if (!movieList) {
      dispatch(getAllMovie());
    }
    // return () => dispatch(resetMovieList());
  }, []);


  // useEffect((_id) => {
  //   // get list user lần đầu
  //   if (!successDetailShowtime) {
  //  dispatch(getDetailShowtime(_id));
  //   }
  //   // return () => dispatch(resetMovieList());
  // }, [successDetailShowtime]);
  
 console.log("successDetaileShowtime12",successDetailShowtime);
 
    console.log("id122",id);


  const handleOpenMovie = () => {
    setData((data) => ({ ...data, openCtr: { ...data.openCtr, movie: true } }));
  };
  const handleOpenTheater = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, theater: true },
    }));
  };

  const handleOpendateShow = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, dateShow: true },
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
  const handleCloseTheater = () => {
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, theater: false },
    }));
  };
  const handleClosedateShow = () => {
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

  const handleSelectMovie = (e) => {
    const isOpenTheater = data.setTheater ? false : true;
    setData((data) => ({
      ...data,
      setMovie: e.target.value,
      startRequest: true,
      openCtr: {
        ...data.openCtr,
        theater: isOpenTheater,
      },
    }));
    NewCinemaAPI.getAllCinema(e.target.value).then((result) => {
      setData((data) => ({
        ...data,
        theaterRender: result.data,
        startRequest: false,
      }));
    });
    console.log(data);
  };

  const handleSelectTheater = (e) => {
    const opendateShow = data.dateShow ? false : true;
    setData((data) => ({
      ...data,
      setTheater: e.target.value.name,
      startRequest: true,
      openCtr: { ...data.openCtr, dateShow: opendateShow },
      idCinema: e.target.value._id,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date !== "Invalid Date") {
      const obj = new Date(date);
      setData((data) => ({
        ...data,
        dateShow: `${(obj.getMonth() + 1).toString().padStart(2, 0)}/${obj
          .getDate()
          .toString()
          .padStart(2, 0)}/${obj.getFullYear()} ${obj
          .getHours()
          .toString()
          .padStart(2, 0)}:${obj.getMinutes().toString().padStart(2, 0)}:00`,
      }));
    }
  };
  const handleDateAccept = () => {
    const openTicketPrice = data.setTicketPrice ? false : true;
    setData((data) => ({
      ...data,
      openCtr: { ...data.openCtr, ticketPrice: openTicketPrice },
    }));
  };

  const handleSelectTicketPrice = (e) => {
    setData((data) => ({
      ...data,
      setTicketPrice: e.target.value,
    }));
    console.log("data", data);
  };

  const handleTaoLichChieu = () => {
    // if (loadingCreateShowtime || !isReadyTaoLichChieu) {
    //   // khi đang gửi requet hoặc chưa sẵn sàng thì không cho dispatch
    //   return;
    // }
    dispatch(
      updateShowtime(id,{
        idMovie: data.setMovie,
        dateShow: data.dateShow,
        idCinema: data.idCinema,
        ticketPrice: data.setTicketPrice,
      })
    ); // ngayChieuGioChieu phải có định dạng dd/MM/yyyy hh:mm:ss
  };

  useEffect(() => {
    if (successUpdateShowtime) {
      setTimeout(() => {
        history.push("/admin/showtime/ShowtimeList");
      }, 100);
      setTimeout(() => {
        enqueueSnackbar("Cập nhật lịch chiếu thành công!", { variant: "success" });
      }, 150);
      return () => dispatch(resetCreateShowtime());
    }
    if (errorCreateShowtime) {
      enqueueSnackbar(errorCreateShowtime, { variant: "error" });
    }
  }, [successUpdateShowtime, errorCreateShowtime]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetMovieList());
  //   };
  // }, []);
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={12}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Chỉnh sửa lịch chiếu
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Fragment>
          <Box sx={{ margin: "20px 0" }}></Box>
          <Grid container rowSpacing={1} spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: "24px",
                }}
              >
                <div className="mb-5 text-lg font-semibold">
                  Thông tin lịch chiếu
                </div>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="select">Chọn phim</InputLabel>
                      <Select
                        labelId="select"
                        id="select"
                        label="Chọn phim"
                        open={data.openCtr.movie} // control open
                        onClose={handleCloseMovie}
                        onOpen={handleOpenMovie}
                        onChange={handleSelectMovie} // value={phim.maPhim} tự động truyền vào handleSelectPhim sau khi chọn phim
                        value={data.setMovie} // giá trị truyền vào quyết định MenuItem nào sẽ được hiển thị sao khi chọn dựa vào value của MenuItem
                      >
                        <MenuItem
                          value=""
                          style={{
                            display: data.openCtr?.movie ? "none" : "block",
                          }}
                          // classes={{
                          //   root: classes.menu__item,
                          //   selected: classes["menu__item--selected"],
                          // }}
                        >
                          Chọn Phim
                        </MenuItem>
                        {movieList?.movie?.map((movie) => (
                          <MenuItem
                            value={movie._id} // giá trị sẽ được đẩy lên
                            key={movie._id}
                          >
                            {movie.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="selectTheater"></InputLabel>
                      <Select
                        labelId="selectTheater"
                        id="selectTheater"
                        // label="Chọn rạp"
                        open={data.openCtr.theater} // control open
                        onClose={handleCloseTheater}
                        onOpen={handleOpenTheater}
                        onChange={handleSelectTheater} // value={phim.maPhim} tự động truyền vào handleSelectPhim sau khi chọn phim
                        renderValue={(value) => `${value ? value : "Chọn rạp"}`} // hiển thị giá trị đã chọn
                        value={data.setTheater} // giá trị truyền vào quyết định MenuItem nào sẽ được hiển thị sao khi chọn dựa vào value của MenuItem
                        displayEmpty // hiển thị item đầu tiên
                      >
                        <MenuItem
                          value=""
                          style={{
                            display:
                              data.theaterRender?.result > 0 ? "none" : "block",
                          }}
                        >
                          {data.setMovie
                            ? `${
                                data.startRequest
                                  ? "Đang tìm rạp"
                                  : "Không tìm thấy, vui lòng chọn phim khác"
                              }`
                            : "Vui lòng chọn phim"}
                        </MenuItem>
                        {data.theaterRender?.cinema?.map((item) => (
                          <MenuItem
                            value={item} // giá trị sẽ được đẩy lên
                            key={item._id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          open={data.openCtr.dateShow}
                          onClose={handleClosedateShow}
                          onOpen={handleOpendateShow}
                          label="Ngày chiếu, giờ chiếu"
                          value={selectedDate}
                          onChange={handleDateChange}
                          onAccept={handleDateAccept}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth>
                      <Select
                        open={data.openCtr.ticketPrice}
                        onClose={handleCloseTicketPrice}
                        onOpen={handleOpenTicketPrice}
                        onChange={handleSelectTicketPrice}
                        value={data.setTicketPrice}
                        renderValue={(value) =>
                          `${value ? value + " vnđ" : "Chọn giá vé"}`
                        }
                        displayEmpty
                      >
                        {data.ticketPriceRender?.map((ticketPrice) => (
                          <MenuItem
                            value={ticketPrice}
                            key={ticketPrice}
                            // classes={{
                            //   root: classes.menu__item,
                            //   selected: classes["menu__item--selected"],
                            // }}
                          >
                            {ticketPrice} vnđ
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={loadingCreateShowtime}
                      sx={{
                        padding: "6px 9px",
                        fontWeight: "700",
                        lineHeight: "1.71429",
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                      }}
                      onClick={handleTaoLichChieu}
                    >
                     Cập nhật
                    </LoadingButton>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Fragment>
      </Box>
    </Container>
  );
}
