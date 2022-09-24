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
import MovieListToolbar from "../../../components/movie/MovieListToolbar";
import MovieListHead from "../../../components/movie/MovieListHead";
import MovieMoreMenu from "../../../components/movie/MovieMoreMenu";
import { filter } from "lodash";
import moment from "moment";

const TABLE_HEAD = [
  { id: "name", label: "Tên phim", alignRight: false },
  { id: "genre", label: "Thể loại", alignRight: false },

  { id: "trailer", label: "Trailer", alignRight: false },
  { id: "images", label: "Hình ảnh", alignRight: false },
  { id: "description", label: "Mô tả", alignRight: false },
  { id: "durations", label: "Thời lượng", alignRight: false },

  { id: "premiere", label: "Ngày khởi chiếu", alignRight: false },
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
  const { movieList,successDelete,addMovie ,successUpdateMovie} = useSelector(
    (state) => state.MovieReducer
  );
    const history = useHistory();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterNameMovie, setFilterNameMovie] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  console.log("movieList", movieList);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log("userLogin", userLogin);




  useEffect(() => {
    if (!movieList) {
      dispatch(getAllMovie());
    }
    // return () => dispatch(resetUserList());
  }, [movieList]);


   useEffect(() => {
    if ( successDelete ) {
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
    if (successDelete || addMovie || successUpdateMovie) {
      dispatch(getAllMovie());
    }
  }, [successDelete,addMovie, successUpdateMovie]);

  
  useEffect(()=>{
    return ()=>{
      dispatch(resetMovieList())
    }
  },[]);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = movieList?.movie.map((n) => n.fullName);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - movieList?.result) : 0;

  const filteredMovies = applySortFilter(
    movieList?.movie,
    getComparator(order, orderBy),
   filterNameMovie
  );
console.log("movieList",movieList)

console.log("filteredMovies",filteredMovies)
  const isUserNotFound = movieList?.result === 0;

  

  return <>
  <Box sx={{ margin: 2,display: 'flex', justifyContent: 'flex-end' }}><Button variant="contained" onClick={()=>{
    history.push("/admin/movie/createMovie");
  }}><AddIcon/>Thêm phim mới</Button></Box>
  
    <Container maxWidth="xl">
    
     <Card>
        <MovieListToolbar
          numSelected={selected.length}
          filterNameMovie={filterNameMovie}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <MovieListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={movieList?.result}
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
                    trailer,
                    durations,
                    description,
                   images,
                   premiere,
                   genre
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
                       {genre} 
                      </TableCell>
                      <TableCell align="left">
                       {trailer} 
                      </TableCell>
                      <TableCell align="left">
                        <img src={images} height={250} width={180} alt="" />
                    
                      </TableCell>
                      <TableCell align="left">
                        {description}
                      </TableCell>
                      <TableCell align="left">{durations} phút</TableCell>
                      <TableCell align="left">
                        {premiere.slice(0, 10)}
                      </TableCell>

                      <TableCell align="right">
                        <MovieMoreMenu keyItemId={_id} />
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
          count={movieList?.result}
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
