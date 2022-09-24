import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {
  Stack,
  TextField,
  FormControlLabel,
} from "@mui/material";
import moment from "moment"
import { LoadingButton } from "@mui/lab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { resetUpdateUser, updateUser, updateUserAdmin } from "../../../redux/actions/userAction";
import { object } from "yup/lib/locale";
import { useSnackbar } from "notistack";


export default function EditRole() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const {  successDetailUser ,loadingUpdate, userUpdate }= useSelector((state) => state.UserReducer);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    // password: Yup.string().required("Password is required"),
    // userName: Yup.string().required("UserName is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });
  useEffect(() => {
    if ( userUpdate ) {
      setTimeout(() => {
       history.push("/admin/users");
      }, 100);
      setTimeout(() => {
        enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
      }, 150);
      
      return;
    }
    
  }, [ userUpdate ]);

  useEffect(()=>{
    return ()=>{
      dispatch(resetUpdateUser())
    }
  },[]);

  const formik = useFormik({
    initialValues: {
      userName: successDetailUser?.userName,
      email:  successDetailUser?.email,
      // password:  successDetailUser.password,
      phoneNumber:  successDetailUser?.phoneNumber,
      // userName:  successDetailUser.userName,
      gender:  successDetailUser?.gender,
      dateOfBirth: moment( successDetailUser?.dateOfBirth).format("YYYY-MM-DD"),
      roles: successDetailUser?.roles,
    },
    validationSchema: RegisterSchema,
    onSubmit: (user) => {
      
      dispatch( updateUser(successDetailUser?._id,user));
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;


  const [gender, setGender] = useState("Nữ");
    const onChange = (e) => {
    setGender(e.target.value);
    console.log(e.target.value)
  };
  const [roles, setRole] = useState( successDetailUser?.roles);
    const changeRole = (e) => {
    setRole(e.target.value);
    console.log(e.target.value)
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete
            type="email"
            label="Địa chỉ email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
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
               {...getFieldProps("gender")}
            >
              <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            </RadioGroup>
          </FormControl>
          {/* <Radio.Group onChange={onChange} value={gender}>
               
                  <Radio value={false}>Nam</Radio>
                  <Radio value={true}>Nữ</Radio>
                </Radio.Group> */}
          {/* <Input value={  successDetailUser?.gender ? "Nữ" : "Nam"} /> */}
          <TextField
            fullWidth
            autoComplete
            InputLabelProps={{ shrink: true }}
            type="date"
            label="Ngày sinh"
            {...getFieldProps("dateOfBirth")}
            error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
            helperText={touched.dateOfBirth && errors.dateOfBirth}
          />
          {/* {userLogin.role==="moderator"?    <FormControl> */}
            <FormLabel id="demo-row-radio-buttons-group-label">
              Phân quyền
            </FormLabel>
            <RadioGroup
              onChange={changeRole}
              value={roles}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group" 
               {...getFieldProps("roles")}
            >
              <FormControlLabel value={`admin`} control={<Radio />} label="Admin" />
              <FormControlLabel value={`user`} control={<Radio />} label="User" />
              {  successDetailUser?.roles==="admin" &&   successDetailUser?.roles==="moderator" ? <FormControlLabel value="moderator" control={<Radio />} label="Moderator" />:""}
              

            </RadioGroup>
          {/* </FormControl>:    */}
          
       {/* ""} */}
     
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
  );
}