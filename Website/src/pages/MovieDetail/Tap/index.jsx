import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Rating,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import PropTypes from "prop-types";
import formatDate from "../../../utils/formatDate";
import LichChieu from "./LichChieu";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { scroller } from "react-scroll";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  addComment,
  getAllComment,
  resetComment,
} from "../../../redux/actions/commentAction";
import { useEffect } from "react";
import { getDetailMovie } from "../../../redux/actions/movieAction";
import moment from "moment";
// bình luận bao nhiêu giấy trước
// import "moment/locale/vi";
// moment.locale("vi");

function TabPanel(props) {
  const { isMobile, children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      <Box p={index === 0 ? 0 : 3}>{children}</Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default function CenteredTabs({
  data,
  onClickBtnMuave,
  isMobile,
  onIncreaseQuantityComment,
}) {
  const [commentListDisplay, setCommentListDisplay] = useState({
    comment: [],
    page: 5,
    hideBtn: false,
    idScrollTo: "",
  });
  console.log("commentListDisplay", commentListDisplay);
  const classes = useStyles({ hideBtn: commentListDisplay.hideBtn, isMobile });
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useHistory();
  const [hover, setHover] = React.useState(-1);
  const [valueTab, setValueTab] = useState(0);
  const [openComment, setOpenComment] = useState(false);
  const [warningtext, setwarningtext] = useState(false);
  const [dataComment, setdataComment] = useState({ post: "", point: 0.5 });

  const { successGetDetailMovie } = useSelector((state) => state.MovieReducer);
  const movieId = successGetDetailMovie?.content.id;
  // console.log("data1",data1)
  const { userLogin } = useSelector((state) => state.UserReducer);
  const {textComment } = useSelector(
    (state) => state.CommentReducer
  );
  const commentList = successGetDetailMovie?.content.comment;
  console.log("commentList", commentList);
  const labels = {
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.5",
    5: "5",
  };

  function getLabelText(value) {
    return `${dataComment.point} Star${value !== 1 ? "s" : ""}, ${
      labels[value]
    }`;
  }
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handletyping = (event) => {
    if (event.target.value.length >= 10) {
      // nếu comment quá ngắn
      setwarningtext(false);
    }

    setdataComment((data) => ({ ...data, post: event.target.value }));
  };

  const totalReviewer = successGetDetailMovie?.content.comment.length;
  console.log(
    "successGetDetailMovie?.content.comment",
    successGetDetailMovie?.content.comment
  );
  console.log("totalReviewer", totalReviewer);
  const handlePostComment = () => {
    if (dataComment.post.length < 10) {
      // nếu comment quá ngắn
      setwarningtext(true);
      return;
    }

    dispatch(
      addComment({
        idMovie: movieId,
        userId: userLogin.id,
        content: dataComment.post,
        rating: dataComment.point,
      })
    );
    setOpenComment(false);
    setdataComment({
      post: "",
      point: 0.5,
    });
  };
  useEffect(() => {
    const comment = commentList?.slice(0, commentListDisplay.page);
    setCommentListDisplay((data) => ({ ...data, comment }));
  }, [commentList]);

  useEffect(() => {
    if (commentListDisplay.idScrollTo) {
      scroller.scrollTo(commentListDisplay.idScrollTo, {
        duration: 800,
        offset: -79,
        smooth: "easeInOutQuart",
      });
    }
  }, [commentListDisplay.idScrollTo]);
  const setopenMore = () => {
    let hideBtn = false;
    let addComment = commentList?.length % 5;
    if (commentList?.length % 5 === 0) {
      addComment = 5;
    }
    if (commentListDisplay.page + addComment === commentList?.length) {
      hideBtn = true;
    }
    const idScrollTo = `idComment${
      commentList[commentListDisplay.page]?.createAt
    }`;
    const page = commentListDisplay.page + 5;
    const comment = commentList?.slice(0, page);
    setCommentListDisplay((data) => ({
      ...data,
      comment,
      page,
      hideBtn,
      idScrollTo,
    }));
  };

  useEffect(() => {
    if (textComment) {
    }
    //  console.log("id123",data?.id)
    dispatch(getDetailMovie(movieId));
    dispatch(getAllComment());
  }, [textComment]);

  // // chưa có tác dụng
  useEffect(() => {
    return () => {
      dispatch(resetComment());
    };
  }, []);

  const isLogin = () => {
    if (!userLogin) {
      // nếu chưa đăng nhập
      Swal.fire({
        title: "Bạn cần phải đăng nhập",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login", location.pathname);
        }
      });
    }
  };

  const handleClose = () => {
    setOpenComment(false);
  };
  const handleClickComment = () => {
    if (!userLogin) {
      isLogin();
      return;
    }
    setOpenComment(true);
    setwarningtext(false);
  };
  return (
    <div className={classes.root} id="lichchieu">
      <AppBar
        position="static"
        color="default"
        classes={{ root: classes.appBarRoot }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          centered
          classes={{ indicator: classes.indicator }}
        >
          {(!location.state?.comingMovie ? true : "") && (
            <Tab
              disableRipple
              label="Lịch Chiếu"
              classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
            />
          )}
          <Tab
            disableRipple
            label="Thông Tin"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
          <Tab
            disableRipple
            label="Đánh Giá"
            classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
          />
        </Tabs>
      </AppBar>
      {/* <Fade timeout={400} in={0}> */}
      <TabPanel value={valueTab} index={0}>
        {<LichChieu data={data} />}
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div className={`row text-white ${classes.detailMovie}`}>
          <div className="col-sm-6 col-xs-12">
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>
                Ngày công chiếu
              </p>
              <p className={`float-left ${classes.contentInfo}`}>
                {formatDate(data?.premiere?.slice(0, 10)).YyMmDd}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Đạo diễn</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {" "}
                Adam Wingard{" "}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Diễn viên</p>
              <p className={`float-left ${classes.contentInfo}`}>
                Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Thể Loại</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {data?.genre}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Định dạng</p>
              <p className={`float-left ${classes.contentInfo}`}>
                {`${data?.showtimes[0]?.idCinema?.cinemaType}/Digital`}
              </p>
            </div>
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>
                Quốc Gia SX
              </p>
              <p className={`float-left ${classes.contentInfo}`}>Mỹ</p>
            </div>
          </div>
          <div className="col-sm-6 col-xs-12">
            <div className="row mb-2">
              <p className={`float-left ${classes.contentTitle}`}>Nội dung</p>
            </div>
            <div className="row mb-2">
              <p>{data?.description}</p>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={valueTab} index={2} className={classes.noname}>
        <div className={classes.danhGia}>
          <div className={classes.inputRoot} onClick={handleClickComment}>
            <span className={classes.avatarReviewer}>
              <img
                src={userLogin?.avatar}
                alt="avatar"
                className={classes.avatarImg}
              />
            </span>
            <input
              className={classes.inputReviwer}
              type="text"
              placeholder="Bạn nghĩ gì về phim này?"
              readOnly="readonly"
            />

            <span className={classes.imgReviewerStar}>
              <Rating value={5} size={"medium"} readOnly precision={0.5} />
            </span>
          </div>
        </div>
        {commentListDisplay.comment?.map((comment, index) => (
          <div
            key={`${comment?.createAt}`}
            className={classes.itemDis}
            id={`idComment${comment?.createAt}`}
          >
            <div className={classes.infoUser}>
              <div className={classes.left}>
                <span className={classes.avatar}>
                  <img
                    src={`https://i.pravatar.cc/150?u=${comment?._id}`}
                    alt="avatar"
                    className={classes.avatarImg}
                  />
                </span>
                <span className={classes.liveUser}>
                  <p className={classes.userName}>{comment.userId?.userName}</p>
                  <p className={classes.timePost}>
                    {moment(comment?.createAt).fromNow()}
                  </p>
                </span>
              </div>
              <div className={classes.right}>
                <p className="text-success">{comment.rating}</p>
                <Rating value={comment.rating} precision={0.5} readOnly />
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="py-3 mb-3 border-bottom">{comment.content}</div>
            <span className="d-inline-block" style={{ cursor: "pointer" }}>
              <span className="mr-2">
                <ThumbUpIcon
                  style={{
                    color: "#73757673",
                  }}
                />
              </span>
              <span style={{ color: "#737576" }}>
                <span>0</span> Thích
              </span>
            </span>
          </div>
        ))}

        <div className={classes.moreMovie}>
          <Button
            onClick={() => setopenMore()}
            variant="outlined"
            className={classes.moreMovieButton}
          >
            XEM THÊM
          </Button>
        </div>
      </TabPanel>

      <Dialog
        open={openComment}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog} //lay tat ca comment ra
      >
        <DialogTitle disableTypography className={classes.rootcloseButton}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Grid container direction="column" justify="center" alignItems="center">
          {dataComment.point !== null && (
            <span className={classes.pointPopup}>
              {labels[hover !== -1 ? hover : dataComment.point]}
            </span>
          )}
          <Rating
            name="customStar"
            size="large"
            precision={0.5}
            value={dataComment.point}
            className={classes.starPopup}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              setdataComment((data) => ({ ...data, point: newValue }));
            }}
            getLabelText={getLabelText}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
        </Grid>
        <DialogContent className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            onChange={(event) => handletyping(event)}
            fullWidth
            value={dataComment.post}
            variant="outlined"
            label={
              dataComment.post
                ? ""
                : "Nói cho mọi người biết bạn nghĩ gì về phim này..."
            }
          />
        </DialogContent>
        <DialogActions className="justify-content-center flex-column px-4">
          {warningtext && (
            <DialogContentText className="text-danger">
              Phim đem đến cảm xúc tuyệt vời cho bạn chứ? Chia sẻ thêm nữa đi
              bạn ơi và nhớ gõ trên 10 kí tự nhé.
            </DialogContentText>
          )}
          <Button
            onClick={handlePostComment}
            variant="contained"
            className={classes.btnDang}
          >
            Đăng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}