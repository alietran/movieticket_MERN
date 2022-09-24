import { Container } from "@mui/material";
import React from "react";
import Email from "../../New/Email";
import New from "../../New/New";
// import HomeMovie from "../Movie/HomeMovie";
import MovieHome from "../Movie/MovieHome";

export default function HomeApp() {
  return (
    <>
     <MovieHome/>
      {/* <HomeMovie /> */}
      <New />
      <Email  />
    </>
  );
}
