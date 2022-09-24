import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 getAllMovie, resetMovieList
} from "../../../redux/actions/movieAction";
import { useEffect, useState } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import ActionUser from "../Profile/ActionUser";
import { Fragment } from "react";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
  Link,
  Box,
 
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
// import EditRole from "../Profile/EditRole";
import AddIcon from '@mui/icons-material/Add';

import CinemaListHead from "../../../components/cinema/CinemaListHead";
import ShowtimeMoreMenu from "../../../components/showTime/ShowTimeMoreMenu";
import { filter } from "lodash";
import { getAllCinema } from "../../../redux/actions/cinemaAction";
import { getAllShowtime, resetCreateShowtime, resetShowtimeList } from "../../../redux/actions/showtimeAction";

const TABLE_HEAD = [
  { id: "idCinema", label: "Tên rạp", alignRight: false },
  { id: "idMovie", label: "Tên phim", alignRight: false },
  { id: "ticketPrice", label: "Giá vé", alignRight: false },
  { id: "dateShow", label: "Ngày chiéu", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function changeActive(active) {
  if (active) {
    return "Active";
  } else {
    return "Banned";
  }
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_movie) => _movie.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}


export default function UserManager() {

  const { showtimeList, successDeleteShowtime } = useSelector(
    (state) => state.BookTicketReducer
  );
    const history = useHistory();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterNameMovie, setFilterNameMovie] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
//   console.log("movieList", movieList);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.UserReducer);
  // console.log("userLogin", userLogin);


  useEffect(() => {
      // console.log("showtimeList",showtimeList)
    if (!showtimeList) {
      dispatch(getAllShowtime());
    }
    // return () => dispatch(resetUserList());
  }, [showtimeList]);


   useEffect(() => {
    if (  successDeleteShowtime ) {

      setTimeout(() => {
        enqueueSnackbar("Xóa thành công!", { variant: "success" });
      }, 150);
      
      return;
    }
    
  }, [  successDeleteShowtime ]);
  
  useEffect(() => {
// console.log("showtimeList",showtimeList)
    if ( successDeleteShowtime || showtimeList) {
      dispatch(getAllShowtime());
    }
  }, [ successDeleteShowtime,showtimeList]);

  
  useEffect(()=>{
    return ()=>{
      dispatch(resetCreateShowtime())
    }
  },[]);



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = showtimeList?.showtime.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 const handleFilterByName = (event) => {
    setFilterNameMovie(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - showtimeList?.result) : 0;

  const filteredMovies = applySortFilter(
    showtimeList?.showtime,
    getComparator(order, orderBy),
   filterNameMovie
  );
// console.log("showtimeList",showtimeList)

// console.log("filteredMovies",filteredMovies)
  const isUserNotFound = showtimeList?.result === 0;

  

  return <>
  <Box sx={{ margin: 2,display: 'flex', justifyContent: 'flex-end' }}><Button variant="contained" onClick={()=>{
    history.push("/admin/showtime/createShowtime");
  }}><AddIcon/>Thêm lịch chiếu mới</Button></Box>
  
    <Container maxWidth="xl">
    
     <Card>
       
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <CinemaListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={showtimeList?.result}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredMovies
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    idCinema,
                   idMovie,
                   ticketPrice,
                   dateShow
                  } = row;
                  const isItemSelected = selected.indexOf(_id) !== -1;
                    var formatDateShow = moment(dateShow)
                    .add(0, "hours")
                    .format("DD-MM-YYYY, hh:mm A");
                    console.log("formatDateShow",formatDateShow);
                    console.log("dateShow",dateShow);

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      name="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, _id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {idCinema?.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                       <TableCell align="left">
                       { idMovie?.name} 
                      </TableCell>
                      <TableCell align="left">
                       {ticketPrice} 
                      </TableCell>
                      <TableCell align="left">
                       {formatDateShow} 
                      </TableCell>
                    
                      <TableCell align="right">
                        <ShowtimeMoreMenu id={_id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={6}
                    sx={{ py: 3 }}
                  ></TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={showtimeList?.result}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      </Container>
  </>
  ;
}
