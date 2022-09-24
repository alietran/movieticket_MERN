import React from "react";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deletelUser,
  getAllUser,
  resetDeleteUser,
  resetUserList,
} from "../../../redux/actions/userAction";
import { useEffect, useState } from "react";
import ActionUser from "../Profile/ActionUser";
import { Fragment } from "react";
import { useSnackbar } from "notistack";


export default function UserManager() {
  const { enqueueSnackbar } = useSnackbar();
  const { userList, userLogin, userUpdate, userDeleted } = useSelector(
    (state) => state.UserReducer
  );
  // console.log("userList", userList);
  const dispatch = useDispatch();
  // const { userLogin } = useSelector((state) => state.UserReducer);
  console.log("userLogin", userLogin);
  useEffect(() => {
    if (!userList) {
      dispatch(getAllUser());
    }
    return () => dispatch(resetUserList());
  }, [userList]);

  useEffect(() => {
    if (userUpdate) {
      dispatch(getAllUser());
    }
  }, [userUpdate]);

  
   useEffect(() => {
     if (userDeleted) {
       // setTimeout(() => {
       //  history.push("/admin/users");
       // }, 100);
       setTimeout(() => {
         enqueueSnackbar("Xóa thành công!", { variant: "success" });
       }, 150);

       return;
     }
   }, [userDeleted]);

    useEffect(() => {
      return () => {
        dispatch(resetDeleteUser());
      };
    }, []);


// console.log("userList", userList);
  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    // {
    //   title: "Status",

    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
    },
    {
      title: "Action",
      key: "action",
      render: (text, userList) => (
        <Fragment>
          <ActionUser userId={userList?._id} />
        </Fragment>
      ),
    },
  ];

  const data = userList;

  return <Table columns={columns} dataSource={data} />;
}
