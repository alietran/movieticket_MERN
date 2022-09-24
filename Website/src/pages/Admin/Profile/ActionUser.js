import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deletelUser, getDetailUser, resetUpdate, resetUpdateUser } from "../../../redux/actions/userAction";



export default function ActionUser(props) {
  const { userLogin, successDetailUser } = useSelector(
    (state) => state.UserReducer
  );
  const history = useHistory();
  const [roles, setRole] = useState("admin");
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDetailUser) {
      history.push("/admin/users/account/edit");
    }
  }, [successDetailUser]);
  console.log("successDetailUser", successDetailUser);
  const changeRole = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
  };
  const handleEditDetail = (id) => {
    dispatch(getDetailUser(id));
  };

   useEffect(() => {
     if (history.push("/admin/users")) {
       return () => {
         dispatch(resetUpdate());
       };
     }
   }, []);

  return (
    <div>
      {userLogin?.roles === "admin" ? (
        <span
          className="text-blue-600 text-xl mr-2"
          onClick={() => {
            handleEditDetail(props.userId);
          }}
        >
          <EditOutlined />
        </span>
      ) : (
        ""
      )}

      <span
        style={{ cursor: "pointer" }}
        className="text-red-600  text-xl"
        onClick={() => {
          // Goi action xoa
          if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
            dispatch(deletelUser(props.userId));
          }
        }}
      >
        <DeleteOutlined />
      </span>
    </div>
  );
}
