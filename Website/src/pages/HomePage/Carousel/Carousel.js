
import React, { useEffect } from "react";
import Search from "../Search/Search";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";
import { useDispatch } from "react-redux";

import homeCarouselData from "../../../components/Carousel/carousel";
// import SearchStickets from "./SearchTickets";
import useStyles from "./style";
import BtnPlay from "../../../components/BtnPlay";
// import { LOADING_BACKTO_HOME_COMPLETED } from "../../../reducers/constants/Lazy";
import "./carousel.css";

export default function Carousel() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000, //speed per sence
    autoplay: false,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slickdotsbanner",
  };

  // useEffect(() => {
  //   dispatch({ type: LOADING_BACKTO_HOME_COMPLETED });
  // }, []);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <ArrowForwardIosIcon
        style={{ right: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <ArrowBackIosIcon
        style={{ left: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  return (
    <div id="carousel" className={classes.carousel}>
      <Slider {...settings}>
        {homeCarouselData.map((banner) => {
          return (
            <div key={banner.maPhim} className={classes.itemSlider}>
              <img src={banner?.hinhAnh} alt="banner" className={classes.img} />
              <div
                className={classes.backgroundLinear}
                // onClick={() => history.push(`/phim/${banner.maPhim}`)}
              />
           
                <BtnPlay cssRoot={"play"} urlYoutube={banner.trailer} />
             
            </div>
          );
        })}
      </Slider>
      <Search />
    </div>
  );
}
