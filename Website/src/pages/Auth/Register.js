import * as Yup from "yup";
import { useState, useEffect, Fragment } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { useFormik, Form, FormikProvider, validateYupSchema } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useDispatch, useSelector } from "react-redux";

import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Container,
  Typography,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Card,
  Link,
  Grid,
  Box,
  Alert,
} from "@mui/material";
import { userInfo, userInfoRegis } from "../../redux/actions/userAction";
// import { Radio } from "antd";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// ----------------------------------------------------------------------

export default function Register() {
  const { userRegister, loadingRegis, failRegis } = useSelector(
    (state) => state.UserReducer
  );
  console.log(failRegis)
  const history = useHistory();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    userName: Yup.string().required("UserName is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dateOfBirth: Yup.date()
      .required("*Ngày sinh không được bỏ trống!")
      .test("checkAge", "Ngày phải nhỏ hơn ngày hôm nay", (value) => {
        var today = new Date();
        return value < today;
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
      userName: "",
      gender: "",
      dateOfBirth: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (user) => {
      dispatch(userInfoRegis(user));
    },
  });

  useEffect(() => {
    // đăng nhập thành công thì quay về trang trước đó
    if (userRegister) {
      console.log(123);
      history.push("/login", location.state);
    }
  }, [userRegister]);
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 750,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2, 2),
  }));

  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  }));

  const [gender, setGender] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };

  // const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);

  // };
  return (
    <div className="flex">
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img
          src="https://toplist.vn/images/800px/cum-rap-chieu-phim-duoc-yeu-thich-nhat-tai-tphcm-104306.jpg"
          alt="register"
          // className="h-4/6"
        />
      </SectionStyle>
      <Container maxWidth="sm">
        <Box
          sx={{
            maxWidth: 480,
            margin: "auto",
            display: "flex",
            minHeight: "70vh",
            flexDirection: "column",
            justifyContent: "center",
            padding: "50px 0",
          }}
        >
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom className="text-center">
              Đăng ký
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {failRegis && (
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
                      {failRegis}
                    </Alert>
                  </Fragment>
                )}
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Tên đăng nhập"
                    {...getFieldProps("userName")}
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />

                  <TextField
                    fullWidth
                    label="Điện thoại"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Stack>

                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Mật khẩu"
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    onChange={onChange}
                    value={gender}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Nam"
                    />
                  </RadioGroup>
                </FormControl>
                {/* <Radio.Group onChange={onChange} value={gender}>
               
                  <Radio value={false}>Nam</Radio>
                  <Radio value={true}>Nữ</Radio>
                </Radio.Group> */}
                {/* <Input value={userLogin.gender ? "Nữ" : "Nam"} /> */}
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Ngày sinh"
                  {...getFieldProps("dateOfBirth")}
                  error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                  helperText={touched.dateOfBirth && errors.dateOfBirth}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loadingRegis}
                >
                 Đăng ký
                </LoadingButton>
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                 Nếu đã có tài khoản?&nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="/login">
                    Đăng nhập
                  </Link>
                </Typography>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </div>
  );
}
