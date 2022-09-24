import { Button, Input, Tabs } from "antd";
import React,{useState  } from "react";
import style from "./Account.module.css";
import { Form, Formik, Field, ErrorMessage,FormikProvider,useFormik } from "formik";
import * as yup from "yup";
import { changePassword } from "../../../redux/actions/userAction";
import { useDispatch, useSelector  } from "react-redux";
import Info from "./Info.jsx";


// import { Form, Input, Button, Radio } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink, NavLink, useHistory, useLocation } from "react-router-dom";
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
import { updateUserAdmin } from "../../../redux/actions/userAction";
export default function Account(props) {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const { userLogin ,loadingUpdate }= useSelector((state) => state.UserReducer);
// console.log("props.userId",props.userId)
  function callback(key) {
    console.log(key);
  }
  const handlePassword = (user) => {
    console.log("124667")
    console.log("user",user);
    // if(userLogin){
 dispatch(changePassword(user));
    // }
   
  };
  // const formik = useFormik({
  //   initialValues: {
  //     email: userLogin.email,
  //     // password: userLogin.password,
  //     phoneNumber: userLogin.phoneNumber,
  //     // userName: userLogin.userName,
  //     gender: userLogin.gender,
  //     dateOfBirth: moment(userLogin.dateOfBirth).format("YYYY-MM-DD"),
  //     roles:userLogin.roles,
  //   },
  //   // validationSchema: RegisterSchema,
  //   onSubmit: (user) => {
  //     dispatch( updateUserAdmin(user));
  //   },
  // });

  // const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
  //   formik;
  //   const [gender, setGender] = useState("Nữ");
  //   const onChange = (e) => {
  //   setGender(e.target.value);
  //   console.log(e.target.value)

  // };
  //  const [roles, setRole] = useState("admin");
  //   const changeRole = (e) => {
  //   setRole(e.target.value);
  //   console.log(e.target.value)
  // };

  

  return (
    <Tabs  defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Thông tin chung" key="1">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="bg-cyan-500 text-center z-0 py-9 px-8">
              <div className="w-36 h-36 m-auto rounded-full p-2 border-2 border-dashed border-gray-200">
                <img
                  src="/img/avatar-default-icon.png"
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
              {/* <div className="mt-4 leading-6 text-xs font-normal text-gray-700 text-center">
                Cho phép *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3.1 MB
              </div> */}
            </div>
          </div>
          <div className="col-span-3 ">
            <Info />
          </div>
        </div>
      </TabPane>
      <TabPane tab="Đổi mật khẩu" key="2">
        <Formik 
          initialValues={{
            passwordCurrent: "",
            password: "",
            passwordConfirm: "",
          }}
          // validationSchema={signinUserSchema}
          onSubmit={handlePassword}
        >
          <Form className={`${style.background__card}`}>
            <div className="form-group">
              <label>Mật khẩu cũ</label>
              <Field
                name="passwordCurrent"
                type="password"
                placeholder="Mật khẩu cũ"
                className={`${style.input} form-control w-full`}
              />
              <ErrorMessage
                name="passwordCurrent"
                render={(msg) => <small className="text-danger">{msg}</small>}
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu mới</label>
              <Field
                name="password"
                type="password"
                placeholder="Mật khẩu mới"
                className={`${style.input} form-control w-full`}
              />
              <ErrorMessage
                name="password"
                render={(msg) => <small className="text-danger">{msg}</small>}
              />
            </div>
            <div className="form-group">
              <label>Nhập lại mật khẩu mới</label>
              <Field
                name="passwordConfirm"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                className={`${style.input} form-control w-full`}
              />
              <ErrorMessage
                name="passwordConfirm"
                render={(msg) => <small className="text-danger">{msg}</small>}
              />
            </div>
            <div className="form-group flex justify-end">
              <button className="mt-6 btn btn-success">Lưu thay đổi</button>
            </div>
          </Form>
        </Formik>
      
      
      </TabPane>
     
    </Tabs>
  );
}
