import { styled } from "@mui/material/styles";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikProvider,
  useFormik,
} from "formik";
import { getDetailUser, updateMe, updateUser } from "../../redux/actions/userAction";
import React, { Fragment, useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  useEventCallback,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateUserAdmin } from "../../redux/actions/userAction";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function HomeInfo() {
  
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    // password: Yup.string().required("Password is required"),
    // userName: Yup.string().required("UserName is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { userLogin, loadingUpdate, faileUpdate, successDetailUser,loadingUpdateInfo,updateMeHome } =
    useSelector((state) => state.UserReducer);
  const enqueueSnackbar   = useSnackbar();
  // console.log("status", loadingUpdateInfo);

  useEffect(() => {
    dispatch(getDetailUser(userLogin?._id));
  }, []);
  

  // lấy id ghế để render ra nhiều ghê
  const getIdSeat = (danhSachGhe) => {
    return danhSachGhe
      .reduce((listSeat, seat) => {
        return [...listSeat, seat.name];
      }, [])
      .join(", ");
  };

  const formik = useFormik({
    initialValues: {
      email: userLogin?.email,
      // password: userLogin.password,
      phoneNumber: userLogin?.phoneNumber,
      userName: userLogin?.userName,
      gender: userLogin?.gender,
      dateOfBirth: moment(userLogin?.dateOfBirth).format("YYYY-MM-DD"),
      roles: userLogin?.roles,
    },
    validationSchema: RegisterSchema,
    onSubmit: (user, ) => {
      console.log("user", user)
      dispatch(updateMe(user));
     
    },
  });

  // useEffect(() => {
  //   //  console.log("successDelete",successDelete)
  //   if ( loadingUpdateInfo) {      
  //     setTimeout(() => {
  //       enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
  //     }, 150);      
  //     return;
  //   }
  // }, [loadingUpdateInfo ]);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const [gender, setGender] = useState("Nữ");
  const onChange = (e) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };
  const [roles, setRole] = useState("admin");
  const changeRole = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
   
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%" }} className="my-20">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
            <Tab label="Danh sách vé" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                {" "}
                <img
                  src="/img/avatar-default-icon.png"
                  alt="avatar"
                  className="rounded-full"
                />
              </Item>
            </Grid>
            <Grid item xs={8}>
              {/* <Item> */}
                {" "}  
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      {faileUpdate && (
                        <Fragment>
                          <Alert
                            severity="error"
                            sx={{
                              backgroundColor: "rgb(255, 231, 217)",
                              color: "rgb(122, 12, 46)",
                              "& .MuiAlert-icon": {
                                color: "rgb(255, 72, 66)",
                              },
                            }}
                          >
                            {faileUpdate}
                          </Alert>
                        </Fragment>
                      )}
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          disabled
                          label="Tên đăng nhập"
                          {...getFieldProps("userName")}
                          error={Boolean(touched.userName && errors.userName)}
                          helperText={touched.userName && errors.userName}
                        />

                        <TextField
                          fullWidth
                          label="Số điện thoại"
                          {...getFieldProps("phoneNumber")}
                          error={Boolean(
                            touched.phoneNumber && errors.phoneNumber
                          )}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        autoComplete
                        type="email"
                        label="Email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <FormControl>
                        <FormLabel
                          id="demo-row-radio-buttons-group-label "
                          sx={{ textAlign: "left" }}
                        >
                        Giới tính
                        </FormLabel>
                        <RadioGroup
                          onChange={onChange}
                          value={gender}
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          {...getFieldProps("gender")}
                        >
                          <FormControlLabel
                            value="Nữ"
                            control={<Radio />}
                            label="Nữ"
                          />
                          <FormControlLabel
                            value="Nam"
                            control={<Radio />}
                            label="Nam"
                          />
                        </RadioGroup>
                      </FormControl>
               
                      <TextField
                        fullWidth
                        autoComplete
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        label="Ngày sinh"
                        {...getFieldProps("dateOfBirth")}
                        error={Boolean(
                          touched.dateOfBirth && errors.dateOfBirth
                        )}
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                      />

                      <LoadingButton
                        fullWidth
                        size="medium"
                        type="submit"
                        variant="contained"
                        loading={loadingUpdate}
                      >
                        Cập nhật
                      </LoadingButton>
                    </Stack>
                  </Form>
                </FormikProvider>
              {/* </Item> */}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ padding: "0px 16px"}}>
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr className="whitespace-nowrap">
                  <th scope="col">Stt</th>
                  <th scope="col">Tên phim</th>
                  <th scope="col">Thời lượng phim</th>
                  <th scope="col">Ngày đặt</th>
                  <th scope="col">Tên Rạp</th>
                  {/* <th scope="col">Mã vé</th> */}
                  <th scope="col">Tên ghế</th>
                  <th scope="col">Giá vé(vnđ)</th>
                  <th scope="col">Tổng tiền(vnđ)</th>
                </tr>
              </thead>
              <tbody>
                {successDetailUser?.tickets
                  ?.map((user, index) => (
                    <tr key={user._id} className="whitespace-nowrap">
                      <th scope="row">{index + 1}</th>
                      <td>{user.idShowtime.idMovie.name}</td>
                      <td>{user.idShowtime.idMovie.durations}</td>
                      <td>
                        {new Date(user.createAt).toLocaleDateString()},{" "}
                        {new Date(user.createAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>{user.idShowtime.idCinema.name}</td>
                      {/* <td>{user.maVe}</td> */}
                      <td>
                        {getIdSeat(user.seatList)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("it-IT", {
                          style: "decimal",
                        }).format(user.idShowtime.ticketPrice)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("it-IT", {
                          style: "decimal",
                        }).format(user.totalPrice)}
                      </td>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Box>
    </Container>
  );
}
