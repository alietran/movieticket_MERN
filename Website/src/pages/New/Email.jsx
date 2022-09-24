import { Container } from '@mui/material'
import React from 'react'
import styling from "./Style.module.css"
import useStyles from "./Style"
export default function Email() {
    const classes = useStyles();
  return (
      <div  className={`${classes.colorMail} ${classes.layout}`}> 
      <Container >
        <div className="row justify-content-center ">
    <div className={`${classes.layout}`}>
      <h2  className={`${classes.title}`}>Đăng ký nhận thông báo khuyến mãi !</h2>
      <h6 className="subtitle text-center">Bạn chỉ cần để lại mail chúng tôi sẽ gửi cho bạn các chương trình khuyến mãi nhanh chóng.</h6>
    </div>
  </div>
  <div className="row justify-content-center">
    <div className="col-md-7 col-sm-10 col-12">
      <form action="#" className="mailchimp mt50" noValidate="true">
        <div className="form-group">
          <div className="input-group">
            <input type="email" name="EMAIL" className="form-control" id="mc-email" placeholder="Email của bạn" autoComplete="off" />
            <label htmlFor="mc-email" />
            <button type="submit" className="btn btn-main btn-effect text-white btn-success">Đăng ký</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </Container>
  </div>
  )
}
