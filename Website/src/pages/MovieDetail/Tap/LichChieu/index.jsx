import React, { useState, Fragment } from "react";

import {
  useStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "./styles";
import { Tab, Tabs } from "@mui/material";
import moment from "moment";
import formatDate from "../../../../utils/formatDate";
import BtnGoToCheckout from "../../../../components/BtnGoToCheckOut";
import { useDispatch, useSelector } from "react-redux";
export default function LichChieu({ data }) {
  const classes = useStyles();
  console.log("data", data);
   const { successGetDetailMovie } = useSelector((state) => state.MovieReducer);
  const [value, setValue] = React.useState(0);
  const [indexSelected, setindexSelected] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("successGetDetailMovie",successGetDetailMovie)
  const handleSelectDay = (i) => {
    setindexSelected(i);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        classes={{ root: classes.leftSection, indicator: classes.indicator }}
      >
        {data?.showtimes.map((day, i) => (
          <Tab
            key={day._id}
            // classes={{ wrapper: classes.wrapper, root: classes.tabRoot }}
            label={
              <>
                <div
                  className={classes.dayItem}
                  style={{
                    color: i === indexSelected ? "#fb4226" : "#000",
                  }}
                  onClick={() => handleSelectDay(i)}
                >
                  <p>{formatDate(day.dateShow).dayToday}</p>
                  <p
                    style={{
                      fontSize: i === indexSelected ? "18px" : "16px",
                      transition: "all .2s",
                    }}
                  >
                    {formatDate(day.dateShow).YyMmDd}
                  </p>
                </div>
              </>
            }
          />
        ))}
      </Tabs>
      <div className={classes.rightSection}>
        {data?.showtimes.map((day, i) => (
          <div
            style={{ display: indexSelected === i ? "block" : "none" }}
            key={i}
            className={classes.cumRapItem}
          >
            <Accordion key={day._id} square defaultExpanded={true}>
              <AccordionSummary>
                <img
                  className={classes.imgTheater}
                  alt="theater"
                  src="/img/lotte-cinema-go-vap-15383873960955.jpg"
                />
                <div>
                  {`${day.idCinema.name}, ${day.idCinema.cinemaType}/Digital`}
                </div>
                <div style={{ clear: "both" }}></div>
              </AccordionSummary>
              <AccordionDetails>
                <BtnGoToCheckout lichChieuTheoPhim={day} />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
