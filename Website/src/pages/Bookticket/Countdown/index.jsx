import React, { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import Countdown, { zeroPad } from "react-countdown";

export default function Index() {
  const { loadingBookingTicket, successBookingTicket, errorBookTicket } =
    useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const setTimeCount = useMemo(() => {
    // dùng useMemo để không bị reset
    return Date.now() + 300000;
  }, []);

  const handleTimeOut = () => {
    // chỉ mở modal khi chưa click đặt vé
    if (!loadingBookingTicket && !(successBookingTicket || errorBookTicket)) {
      dispatch({
        type: "TIMEOUT",
      });
    }
  };
  const style = {
    fontWeight: 500,
    fontSize: 34,
    color: "#fb4226",
    lineHeight: "39px",
  };
  return (
    <Countdown
      date={setTimeCount}
      renderer={({ minutes, seconds }) => (
        <span style={style}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
      onComplete={() => handleTimeOut()}
    />
  );
}
