import { baseService } from "./baseService";

// router của user api
export class ticketAPI extends baseService {
  constructor() {
    super();
  }

  getAllTicket = () => {
    return this.get("/api/ticket/getAllTicket");
  };
  deleteTicket = (id) => {
    return this.delete(`/api/ticket/deleteTicket/${id}`);
  };

  // payment = () =>{
  //   return this.post("/api/ticket/pay");
  // }
}
export const NewTicketAPI = new ticketAPI();
