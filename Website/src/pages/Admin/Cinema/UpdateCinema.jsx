import React from "react";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deletelUser,
  getAllUser,
  resetUserList,
} from "../../../redux/actions/userAction";
import { useFormik, Form, FormikProvider, validateYupSchema, Formik } from "formik";
import { useEffect, useState } from "react";
import ActionUser from "../Profile/ActionUser";
import { Fragment } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import {createMovie } from "../../../redux/actions/movieAction";
import { useSnackbar } from "notistack";
import {
  resetMovieList
} from "../../../redux/actions/movieAction";
import { createCinema, updateCinema } from "../../../redux/actions/cinemaAction";
import { useHistory } from "react-router-dom";
export default function UpdateCinema() {
 const {  addCinema,successGetDetailCinema,successUpdateCinema } = useSelector(
    (state) => state.CinemaReducer
  );


   const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
    const CinemaSchema = Yup.object().shape({
    name: Yup.string().required("Tên phim không được bỏ trống"),
    cinemaType: Yup.string().required("Loại rạp được bỏ trống"),
    seatsTotal: Yup.string().required("Tổng số ghế không được bỏ trống"),
   
  });
//  console.log(addMovie)
 useEffect(() => {
  
    if ( successUpdateCinema) {
       setTimeout(() => {
        history.push("/admin/cinema/cinemaList");
      }, 100);
       setTimeout(() => {
        enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
      }, 150);
    }
  }, [ successUpdateCinema]);

  useEffect(()=>{
    return ()=>{
      dispatch(resetMovieList())
    }
  },[]);

  const formik = useFormik({
    initialValues: {
      name: successGetDetailCinema?.data.name,
      cinemaType: successGetDetailCinema?.data.cinemaType,
    seatsTotal: successGetDetailCinema?.data.seatsTotal,
      
    },
    validationSchema: CinemaSchema,
    onSubmit: (cinema) => {
      dispatch( updateCinema(successGetDetailCinema?.data._id,cinema));
      // console.log(movie)
    },
  });
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  console.log("successGetDetailCinema",successGetDetailCinema)

  return <>
     <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
          Chỉnh sửa rạp
        </Typography>
          <Formik value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 "></div>
         <div className="col-span-3">          
           <Stack spacing={2} >
                <Stack  direction={{ xs: "column", sm: "row" }}   spacing={2} >
                  <TextField 
                    fullWidth
                    label="Tên rạp"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                   
                  />

                  <TextField
                    fullWidth
                 
                    label="Loại rạp"
                    {...getFieldProps("cinemaType")}
                    error={Boolean(touched.cinemaType && errors.cinemaType)}
                    helperText={touched.cinemaType && errors.cinemaType}
                  />
                      </Stack>
                <TextField
                  fullWidth
                  component="span" 
                  label="Số ghế"
                  {...getFieldProps("seatsTotal")}
                  error={Boolean(touched.seatsTotal && errors.seatsTotal)}
                  helperText={touched.seatsTotal && errors.seatsTotal}
                  disabled
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
        </div>
           </Form>
          </Formik>
  </> ;
}
