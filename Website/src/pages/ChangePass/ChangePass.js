// import { NavLink, Prompt } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import * as yup from "yup";
import { userInfo } from "../../redux/actions/userAction";
import { Form, Formik, Field, ErrorMessage } from "formik";

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const signinUserSchema = yup.object().shape({
    userName: yup.string().required("Please input your Username!"),
    password: yup.string().required("Please input your Password!"),
  });
  let location = useLocation();
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log("userLogin", userLogin);

  const handleLogin = (user) => {
    dispatch(userInfo(user));
  };

  return (
    <Formik validationSchema={signinUserSchema} onSubmit={handleLogin}>
      <Form className="container">
        <h2>Đổi mật khẩu</h2>
        <div className="form-group">
          <label>Mật khẩu cũ</label>
          <Field
            name="currentpass"
            type="password"
            className="form-control"
            // onChange={handleChange}
          />
          <ErrorMessage
            name="currentpass"
            render={(msg) => <small className="text-danger">{msg}</small>}
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu mới</label>
          <Field
            name="newPassword"
            type="password"
            className="form-control"
            // onChange={handleChange}
          />
          <ErrorMessage
            name="newPassword"
            render={(msg) => <small className="text-danger">{msg}</small>}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Gửi</button>
         
        </div>
      
      </Form>
    </Formik>
  );
}
