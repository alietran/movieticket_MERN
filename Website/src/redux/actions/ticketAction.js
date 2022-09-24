import { NewTicketAPI } from "../../api/ticket";
import Swal from "sweetalert2";

export const getAllTicket = () => {
  return async (dispatch) => {
    try {
      const content = await NewTicketAPI.getAllTicket();
      // console.log("result", content);
      dispatch({
        type: "GET_ALL_TICKET",
        ticket: content.data.data,
        length: content.data.result,
     
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};
export const deleteTicket = (id) => {
  return async (dispatch) => {
    try {
      const content = await NewTicketAPI.deleteTicket(id);
      console.log("content", content);
      dispatch({
        type: "DELETE_TICKET_SUCCESS",
        ticket: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};
export const payment = () =>{
   return async (dispatch) => {
     try {
       
       const content = await NewTicketAPI.payment();
       console.log("content", content);
       dispatch({
         type: "PAYMENT_SUCCESS",
        //  payment: content.data,
       });
     } catch (error) {
      //  console.log("error", error.response);
       // console.log("error", error.response?.data.message);
     }
   };
}