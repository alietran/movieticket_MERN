import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { borders } from "@mui/system";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import useStyles from "./style";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { Avatar } from "@mui/material";
import { ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "../../../theme/overrides/IconButton";
import clsx from "clsx";
import { List } from "@mui/material";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.UserReducer);
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles({ openDrawer });
  const style= useStyles();

  const hanleLogin = () => {
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  const handleRegis = () => {
    setTimeout(() => {
      history.push("/register");
    }, 1000);
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  return (
    <header className=" dark:bg-coolGray-800 dark:text-coolGray-100 bg-white fixed top-0 right-0 left-auto  w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <Link
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center "
        >
          <img src="/img/logo.png" className="w-full h-24" />
        </Link>
        {/* <div>
          {" "}
          {!userLogin ? (
            <div className="text-center flex align-middle leading-10 mt-3 text-gray-400 ">
              <button
                className="self-center px-8 py-1 rounded btn-success"
                onClick={hanleLogin}
              >
                Đăng nhập
              </button>
              <button
                className="self-center mx-2 px-8 py-1 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900 outline-white border-white"
                onClick={handleRegis}
              >
                Đăng ký
              </button>
            </div>
          ) : (
            <div className="text-center flex align-middle leading-10 mt-3 text-gray-400 ">
              <Link
                to="/user"
                className="text-gray-400 cursor-pointer hover:text-green-500"
              >
                {userLogin?.userName}{" "}
              </Link>
              <div className=" px-3"> | </div>
              <div
                className="pr-3 cursor-pointer hover:text-green-500"
                onClick={handleLogout}
              >
                {" "}
                Đăng xuất
              </div>
            </div>
          )}
        </div> */}

        {/* <Drawer
          className={classes.drawer}
          anchor="right"
          onClose={handleDrawerClose}
          open={openDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          transitionDuration={300}
        > */}

        <div className={classes.drawerHeader}>
          {!userLogin ? (
            <ListItem
              // button
              classes={{
                root: clsx(classes.itemAuth, classes.divide, classes.hover),
              }}
              // onClick={handleUser}
            >
              <button
                className="self-center px-8 py-1 rounded btn-success"
                onClick={hanleLogin}
              >
                Đăng nhập
              </button>
              <button
                className="self-center mx-2 px-8 py-1 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900 outline-white border-white"
                onClick={handleRegis}
              >
                Đăng ký
              </button>
            </ListItem>
          ) : (
            <ListItem
              // button
              // classes={{ root: classes.listItem }}
              // onClick={hanleLogin}
            >
              <Link to="/user" className={style.listItem}>
                {userLogin?.userName}
              </Link>
              <div className=" px-3"> | </div>
              <div className={classes.itemMenu} onClick={handleLogout}>
                Đăng xuất
              </div>
            </ListItem>
          )}
        </div>
        {/* {userLogin ? (
              <ListItem
                button
                classes={{
                  root: clsx(classes.itemAuth, classes.divide, classes.hover),
                }}
                // onClick={handleUser}
              >
                <ListItemIcon classes={{ root: classes.icon }}>
                  <Avatar
                    alt="avatar"
                    className={classes.avatar}
                    src={`https://i.pravatar.cc/300?u=${userLogin.taiKhoan}`}
                  />
                </ListItemIcon>
                <Link
                  to="/user"
                  className="text-gray-400 cursor-pointer hover:text-green-500"
                >
                  {userLogin?.userName}{" "}
                </Link>
              </ListItem>
            ) : (
              <ListItem
                button
                classes={{ root: classes.listItem }}
                onClick={hanleLogin}
              >
                <ListItemIcon classes={{ root: classes.icon }}>
                  <AccountCircleIcon fontSize="large" />
                </ListItemIcon>
                <span className={classes.link} style={{ fontWeight: 500 }}>
                  Đăng Nhập
                </span>
              </ListItem>
            )}
            <IconButton
              classes={{ root: classes.listItem }}
              // onClick={handleDrawerClose}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <List>
            {headMenu.map((link) => (
              <span
                key={link.id}
                className={classes.itemMenu}
                // onClick={() => handleClickLink(link.id)}
              >
                {link.nameLink}
              </span>
            ))}

            {userLogin ? (
              <span className={classes.itemMenu} onClick={handleLogout}>
                Đăng Xuất
              </span>
            ) : (
              <span className={classes.itemMenu}>Đăng Ký</span>
            )}
          </List> */}
        {/* </Drawer> */}
      </div>
    </header>
  );
}
