// import { Container } from "@mui/material";
// import React, { useEffect } from "react";
// import Slider from "react-slick";

// import { useDispatch, useSelector } from "react-redux";
// import { getAllMovie } from "../../../redux/actions/movieAction";
// // import ArrowBackIosRoundedIcon from "@mui/icons/ArrowBackIosRounded";
// // import ArrowForwardIosRoundedIcon from "@mui/icons/ArrowForwardIosRounded";
// import useStyles from "../../New/Style";
// import { useHistory } from "react-router-dom";

// export default function HomeMovie() {
//   const classes = useStyles();
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const { movieList } = useSelector((state) => state.MovieReducer);
//   // useEffect = (() =>{
//   //     console.log("first");
//   //     dispatch(getAllMovie());
//   // })
//   console.log("movieList", movieList);
//   useEffect(() => {
//     if (!movieList) {
//       dispatch(getAllMovie());
//     }
//     // return () => dispatch(resetUserList());
//   }, [movieList]);

//   const renderMovie = () => {
//     return movieList?.movie.map((movie, index) => (
//       <div key={index} className="lg:w-1/4  md:w-1/2  w-full mx-10 ">
//         <a
//           className="relative h-48 rounded overflow-hidden "
//           onClick={() => history.push(`/movie/${movie._id}`)}
//         >
//           <img
//             alt="ecommerce"
//             className="object-cover object-center w-full bg-cover"
//             src={movie.images}
//           />
//         </a>
//         <div className="mt-4">
//           <h2 className="text-gray-900 title-font text-lg font-medium">
//             {movie.name}
//           </h2>
//           <p className="mt-1">
//             {movie.durations} | {movie.genre}
//           </p>
//         </div>
//       </div>
//     ));
//   };
//   return (
//     <div className={`${classes.layout}`}>
//       <Container maxWidth="lg">
//         <h2 className={` ${classes.title}`}>Danh sách phim</h2>
//         <Slider {...settings}>
//           {movieList?.movie.map((movie) => (
//             <section className="text-gray-600  body-font">
//               <div className="container px-5 py-14 mx-auto">
//                 <div className="flex flex-wrap -m-4">{renderMovie()}</div>
//               </div>
//             </section>
//           ))}
//         </Slider>
//       </Container>
//     </div>
//   );
// }
