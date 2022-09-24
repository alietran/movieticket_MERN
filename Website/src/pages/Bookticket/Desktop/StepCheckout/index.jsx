import React from "react";

import clsx from "clsx";
import WeekendIcon from "@mui/icons-material/Weekend";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { useStyles, ColorlibConnector } from "./style";
import { Step, StepLabel, Stepper } from "@mui/material";

export default function StepCheckout() {
  const history = useHistory();
  const classes = useStyles();
  const activeStep = useSelector((state) => state.BookTicketReducer.activeStep);
  const { userLogin } = useSelector((state) => state.UserReducer);

  const steps = ["CHỌN GHẾ", "THANH TOÁN", "KẾT QUẢ ĐẶT VÉ"];

  function StepIcon(props) {
    const { active, completed } = props;
    const icons = {
      1: <WeekendIcon />,
      2: <PaymentIcon />,
      3: <CheckCircleIcon />,
    };
    return (
      <div
        className={clsx(classes.stepIcon, {
          [classes.stepIconActive]: active,
          [classes.stepIconCompleted]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const handleUser = () => {
    history.push("/user");
  };

  return (
    <div className={classes.root}>
        <Link
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center "
        >
          <img src="/img/logo.png" className="w-full h-24" />
        </Link>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.stepper}
        connector={<ColorlibConnector />}
      >
        
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              classes={{ label: classes.label }}
              StepIconComponent={StepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.account} onClick={handleUser}>
        <img src={userLogin.avatar} alt="avatar" className={classes.avatar} />
        <p className={classes.hoTen}>{userLogin.userName}</p>
      </div>
    </div>
  );
}

// ColorlibConnector: đường gạch ngang nối giữa các bước
// activeStep: xác định step hiện tại
// StepIconComponent: node làm icon đại diện, mặc định nhận vào boolean active, completed, error và number: icon để css tương ứng
