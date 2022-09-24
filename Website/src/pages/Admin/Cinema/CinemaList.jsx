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
import { useSnackbar } from "notistack";
// import EditRole from "../Profile/EditRole";
import AddIcon from '@mui/icons-material/Add';

import CinemaListHead from "../../../components/cinema/CinemaListHead";
import CinemaMoreMenu from "../../../components/cinema/CinemaMoreMenu";
import { filter } from "lodash";
import { getAllCinema, resetCinemaList } from "../../../redux/actions/cinemaAction";

const TABLE_HEAD = [
  { id: "name", label: "Tên rạp", alignRight: false },
  { id: "cinemaType", label: "Loại rạp", alignRight: false },
  { id: "seatsTotal", label: "Số ghế", alignRight: false },
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


export default function CinemaList() {
  const { cinemaList,successDelete,addCinema,successUpdateCinema } = useSelector(
    (state) => state.CinemaReducer
  );
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
  console.log("userLogin", userLogin);




  useEffect(() => {
    if (!cinemaList) {
      dispatch(getAllCinema());
    }
    // return () => dispatch(resetUserList());
  }, [cinemaList]);


   useEffect(() => {
     console.log("successDelete",successDelete)
    if ( successDelete) {
      // setTimeout(() => {
      //  history.push("/admin/users");
      // }, 100);
      setTimeout(() => {
        enqueueSnackbar("Xóa thành công!", { variant: "success" });
      }, 150);
      
      return;
    }
    
  }, [ successDelete ]);
  
  useEffect(() => {
    if (successDelete ||addCinema ||successUpdateCinema ) {
      dispatch(getAllCinema());
    }
  }, [successDelete,addCinema,successUpdateCinema]);

  
  useEffect(()=>{
    return ()=>{
      dispatch(resetCinemaList())
    }
  },[]);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cinemaList?.cinema.map((n) => n.fullName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cinemaList?.result) : 0;

  const filteredMovies = applySortFilter(
    cinemaList?.cinema,
    getComparator(order, orderBy),
   filterNameMovie
  );
console.log("cinemaList",cinemaList)

console.log("filteredMovies",filteredMovies)
  const isUserNotFound = cinemaList?.result === 0;

  

  return <>
  <Box sx={{ margin: 2,display: 'flex', justifyContent: 'flex-end' }}><Button variant="contained" onClick={()=>{
    history.push("/admin/cinema/createCinema");
  }}><AddIcon/>Thêm rạp mới</Button></Box>
  
    <Container maxWidth="xl">
    
     <Card>
       
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <CinemaListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={cinemaList?.result}
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
                    name,
                   cinemaType,
                   seatsTotal
                  } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

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
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                       <TableCell align="left">
                       {cinemaType} 
                      </TableCell>
                      <TableCell align="left">
                       {seatsTotal} 
                      </TableCell>
                    
                      <TableCell align="right">
                        <CinemaMoreMenu keyItemId={_id} />
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
          count={cinemaList?.result}
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
