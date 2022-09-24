import { Box, CircularProgress, Rating } from "@mui/material";
import useStyles from "./styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailMovie } from "../../redux/actions/movieAction";
import formatDate from "../../utils/formatDate";
import { useLocation, useParams } from "react-router-dom";
import Tap from "./Tap";
import { scroller } from "react-scroll";
import BtnPlay from "../../components/BtnPlay";

export default function MovieDetail(props) {
  const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
  const [quantityComment, setQuantityComment] = useState(10);
  const [dataComment, setdataComment] = useState({ post: "", point: "5" });
  const dispatch = useDispatch();
  const { commentList, textComment } = useSelector(
    (state) => state.CommentReducer
  );
  const { successGetDetailMovie } = useSelector((state) => state.MovieReducer);
  const data = successGetDetailMovie?.content;
  let location = useLocation();
  console.log("commentList", commentList);
  const [setImageNotFound] = useState(false);
  const { id } = props.match.params;
  const handleBtnMuaVe = () => {
    setOnClickBtnMuave(Date.now());
  };
  const totalReviewer = successGetDetailMovie?.content.comment.length;
  const onIncreaseQuantityComment = (value) => {
    setQuantityComment(value);
  };
  useEffect(function () {
    dispatch(getDetailMovie(id));
    // return () => {
    dispatch({ type: "RESET_MOVIE_LIST" });
    // };
  }, []);
  const classes = useStyles({
    bannerImg: data?.images,
  });
  const headMenu = [{ nameLink: "Mua vé", id: "lichchieu" }];
  // console.log("location.pathname", location.pathname);
  const handleClickLink = (id) => {
    // setOpenDrawer(false)

    scroller.scrollTo(id, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  // reduce tính tổng
  const totalReview = successGetDetailMovie?.content.comment.reduce(
    (total, item) => {
      return total + item.rating;
    },
    0
  );
  const ratingMovie = totalReview / totalReviewer;
  // const totalRating = successGetDetailMovie?.content.comment.map((rate)=>{
  //   return rate.rating++;
  // })
  // console.log("totalReview123")
  // console.log("dataComment.point",dataComment.point);
  return (
    <div className={classes.desktop}>
      <div className={classes.top}>
        <div className={classes.gradient}></div>
        <div className={classes.bannerBlur}>
          {/* {imageNotFound && <div className={classes.withOutImage}></div>} */}
        </div>

        <div className={classes.topInfo}>
          <div className={classes.imgTrailer}>
            <BtnPlay urlYoutube={data?.trailer} />
            {/* xử lý khi url hình bị lỗi */}
            <img
              //   src={data.hinhAnh}
              alt="poster"
              style={{ display: "none" }}
              onError={(e) => {
                e.target.onerror = null;
                setImageNotFound(true);
              }}
            />
            {/* {imageNotFound && <div className={classes.withOutImage}></div>} */}
          </div>
          <div className={classes.shortInfo}>
            <p>{formatDate(data?.premiere?.slice(0, 10)).YyMmDd}</p>
            <p className={classes.movieName}>
              <span className={classes.c18}>C18</span>
              {data?.name}
            </p>
            <p>
              {`${data?.durations ?? "120"} phút - ${
                data?.showtimes[0]?.idCinema?.cinemaType
              }/Digital`}{" "}
            </p>
            {headMenu.map((link) => (
              <button
                key={link.id}
                className={classes.btnMuaVe}
                onClick={() => handleClickLink(link.id)}
              >
                {link.nameLink}
              </button>
            ))}
          </div>
          <div className={classes.rate}>
            <div className={classes.circular}>
              <span className={classes.danhGia}>
                {" "}
                {ratingMovie ? ratingMovie.toFixed(1) : 0}{" "}
              </span>
              <CircularProgress
                variant="determinate"
                size="100%"
                value={100}
                className={classes.behined}
                color="secondary"
              />
              <CircularProgress
                variant="determinate"
                size="100%"
                value={10 * 10}
                className={classes.fabProgress}
                color="secondary"
              />
            </div>
            <div className={classes.rateStar}>
              <Rating value={ratingMovie.toFixed(1)} precision={0.5} readOnly />
            </div>
            <span> {totalReviewer} người đánh giá</span>
          </div>
        </div>
      </div>
      <Tap
        data={data}
        onClickBtnMuave={onClickBtnMuave}
        onIncreaseQuantityComment={onIncreaseQuantityComment}
      />
    </div>
  );
}
