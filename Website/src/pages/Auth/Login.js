import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import { useFormik, Form, FormikProvider, Formik } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { userInfo } from "../../redux/actions/userAction";

// ----------------------------------------------------------------------

export default function Login() {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = yup.object().shape({
    userName: yup.string().required("Please input your Username!"),
    password: yup.string().required("Please input your Password!"),
  });

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
    maxWidth: 580,
    margin: "auto",
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  }));

  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();

  const { userLogin } = useSelector((state) => state.UserReducer);
  // console.log("userLogin", userLogin);
  console.log("userLogin", userLogin);
  //kg dùng
  const handleLogin = (user) => {
    console.log(user);
    dispatch(userInfo(user));
  };

  useEffect(() => {
    // đăng nhập thành công thì quay về trang trước đó

    if (userLogin) {
      if (userLogin.roles === "moderator" || userLogin.roles === "admin")
        setTimeout(() => {
          history.push("admin/users/account");
        }, 2000);
      else {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    }
  }, [userLogin]);

  const formik = useFormik({
    initialValues: {
      userName: "admin0211",
      password: "ngocdiep0211@",
    },
    validationSchema: LoginSchema,
    onSubmit: (user) => {
      dispatch(userInfo(user));
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div className="flex">
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img
          src="https://toplist.vn/images/800px/cum-rap-chieu-phim-duoc-yeu-thich-nhat-tai-tphcm-104306.jpg"
          alt="login"
          // className="h-4/6"
        />
      </SectionStyle>
      <Container maxWidth="sm">
        {/* <ContentStyle> */}
        <Box
          sx={{
            maxWidth: 580,
            margin: "auto",
            display: "flex",
            minHeight: "20vh",
            flexDirection: "column",
            justifyContent: "center",
            // padding: theme.spacing(12, 0),
          }}
        ></Box>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom className="text-center">
            Đăng nhập
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="userName"
                type="text"
                name="userName"
                label="Tên đăng nhập"
                {...getFieldProps("userName")}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
                name="password"
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
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                  // {...getFieldProps("remember")}
                  // checked={values.remember}
                  />
                }
                label="Ghi nhớ tôi"
              />

              <Link component={RouterLink} variant="subtitle2" to="#">
                Quên mật khẩu
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitting}
            >
              Đăng nhập
            </LoadingButton>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Chưa có tài khoản?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Đăng ký
              </Link>
            </Typography>
          </Form>
        </FormikProvider>
        {/* </ContentStyle> */}
      </Container>
    </div>
  );
}
