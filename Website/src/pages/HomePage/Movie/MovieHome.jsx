
import { Container } from "@mui/material";
import React, { Component , useEffect } from "react";
import Slider from "react-slick";
import useStyles from "./style";
import styleSlick from "./Style.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllMovie } from "../../../redux/actions/movieAction";


import { Link, useHistory } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
export default function MovieHome(props) {
    
  
      const classes = useStyles();
    const settings = {
      className: "center variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: 0,
      slidesToShow: 4,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
       variableWidth: true
    };
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieList } = useSelector((state) => state.MovieReducer);
  // useEffect = (() =>{
  //     console.log("first");
  //     dispatch(getAllMovie());
  // })
  console.log("movieList", movieList);
  useEffect(() => {
    if (!movieList) {
      dispatch(getAllMovie());
    }
    // return () => dispatch(resetUserList());
  }, [movieList]);

     const renderMovie = () => {
    return movieList?.movie.map((movie, index) => (
      <div key={index}  className={` ${styleSlick['width-item']}`}>
         <Link to={`/movie/${movie._id}`} className="relative h-10 rounded overflow-hidden">
                 <img
            alt="ecommerce"
            className="object-contain object-center  bg-cover"
            src={movie.images}
            style={{ height: 300}}
          />
               </Link>
     
          {/* <img
            alt="ecommerce"
            className="object-contain object-center  bg-cover"
            src={movie.images}
            style={{ height: 300}}
          /> */}
       
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {movie.name}
          </h2>
          <p className="mt-1">
            {movie.durations} phút | {movie.genre}
          </p>
        </div>
      </div>
    ));
  };
    return (
      <Container maxWidth="lg">
      
        <Slider {...settings} style={{margin: "60px 0 70px 0"}}>
          {renderMovie()}
         
        </Slider>
      </Container>
    );
  }
