import React from 'react'
import { Redirect,useHistory } from 'react-router-dom';
import { Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import HomeInfo from '../HomeInfo/HomeInfo';

export default function Profile(props) {
  const {  userLogin } = useSelector(
    (state) => state.UserReducer
  );
  const history = useHistory();
  const { Component, ...restProps } = props;

  return (
    <Route {...restProps} render = {(propsRoute)=>{
        if(userLogin){
            return <HomeInfo {...propsRoute}/>
        }
       return (
            history.push("/login")
       )
          
    }}/>
  )
}
