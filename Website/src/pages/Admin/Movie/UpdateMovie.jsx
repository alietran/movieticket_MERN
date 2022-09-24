import React from "react";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deletelUser,
  getAllUser,
  resetUserList,
} from "../../../redux/actions/userAction";
import {
  useFormik,
  Form,
  FormikProvider,
  validateYupSchema,
  Formik,
} from "formik";
import { useEffect, useState } from "react";
import ActionUser from "../Profile/ActionUser";
import { Fragment } from "react";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import { createMovie, updateMovie } from "../../../redux/actions/movieAction";
import { useSnackbar } from "notistack";
import { resetMovieList } from "../../../redux/actions/movieAction";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function UpdateMovie() {
  const { addMovie, successGetDetailMovie, successUpdateMovie } = useSelector(
    (state) => state.MovieReducer
  );
  const history = useHistory();
  console.log("successGetDetailMovie123", successGetDetailMovie);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const MovieSchema = Yup.object().shape({
    name: Yup.string().required("Tên phim không được bỏ trống"),
    genre: Yup.string().required("Thể loại được bỏ trống"),
    trailer: Yup.string().required("Trailer không được bỏ trống"),
    premiere: Yup.string().required("Ngày chiếu không được bỏ trống"),
    durations: Yup.string().required("Thời gian chiếu không được bỏ trống"),
    description: Yup.string().required("Mô tả không được bỏ trống"),
  });
  console.log(addMovie);
  useEffect(() => {
    if (successUpdateMovie) {
      setTimeout(() => {
        history.push("/admin/movie/listMovie");
      }, 100);
      setTimeout(() => {
        enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
      }, 150);
    }
  }, [successUpdateMovie]);

  // const{genre, trailer,premiere,durations, description,_id} = successGetDetailMovie?.content;
  const formik = useFormik({
    initialValues: {
      name: successGetDetailMovie?.content.name,
      genre: successGetDetailMovie?.content.genre,
      trailer: successGetDetailMovie?.content.trailer,
      premiere: moment(successGetDetailMovie?.content.premiere).format(
        "YYYY-MM-DD"
      ),
      durations: successGetDetailMovie?.content.durations,
      description: successGetDetailMovie?.content.description,
      images: successGetDetailMovie?.content.images,
    },
    validationSchema: MovieSchema,
    onSubmit: (movie) => {
      dispatch(updateMovie(successGetDetailMovie?.content._id, movie));
      // console.log(movie)
    },
  });
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  useEffect(() => {
    return () => {
      dispatch(resetMovieList());
    };
  }, []);

  const [srcImage, setSrcImage] = useState(
  values.images
  );
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("images", file);
  };
  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
        Tạo phim mới
      </Typography>
      <Formik value={formik}>
        <Form noValidate onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 ">
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Tên phim"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  label="Thể loại"
                  {...getFieldProps("genre")}
                  error={Boolean(touched.genre && errors.genre)}
                  helperText={touched.genre && errors.genre}
                />

                <TextField
                  fullWidth
                  label="Trailer"
                  {...getFieldProps("trailer")}
                  error={Boolean(touched.trailer && errors.trailer)}
                  helperText={touched.trailer && errors.trailer}
                />

                <TextField
                  id="date"
                  label="Ngày khởi chiếu"
                  type="date"
                  sx={{ width: "100%" }}
                  {...getFieldProps("premiere")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(touched.premiere && errors.premiere)}
                  helperText={touched.premiere && errors.premiere}
                />

                <TextField
                  fullWidth
                  label="Thời lượng"
                  {...getFieldProps("durations")}
                  error={Boolean(touched.durations && errors.durations)}
                  helperText={touched.durations && errors.durations}
                />
                <TextField
                  fullWidth
                  label="Nội dung"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  // loading={loadingRegis}
                >
                  Cập nhật
                </LoadingButton>
              </Stack>
            </div>
            <div className="col-span-2">
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: " 26px 24px",
                }}
              >
                <div className="mb-3 text-lg font-semibold">Hình ảnh phim</div>
                <hr />
                <div className="text-center">
                  <div className="w-full h-full border-2 border-dashed border-gray-200 inline-flex">
                    <label className="w-full h-full outline-none overflow-hidden items-center justify-center relative cursor-pointer py-12">
                      <input
                        type="file"
                        id="poster"
                        name="poster"
                        hidden
                        multiple
                        onChange={handleChangeFile}
                      />
                      {srcImage ? (
                        <img
                          accept="image/*"
                          multiple
                          src={srcImage}
                          alt="avatar"
                          className="w-48 h-auto inline-flex object-cover"
                        />
                      ) : (
                        <img
                          accept="image/*"
                          multiple
                          src="/img/drop_and_select.png"
                          alt="avatar"
                          className="inline-flex"
                        />
                      )}
                      {srcImage ? "" : <h5>Kéo và thả ảnh của phim vào đây</h5>}
                      {srcImage ? "" : <p class="mb-2">or</p>}
                      {srcImage ? (
                        ""
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          Upload
                        </Button>
                      )}
                    </label>
                  </div>
                </div>
                {/* <span className="overflow-hidden z-50 w-full h-full block">
                      <span className=" w-36 h-36 bg-cover inline-block">
                        <img
                          src={srcImage}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </span>
                    </span> */}
              </Card>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
