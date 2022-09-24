import { baseService } from "./baseService";
// router của user api
export class showtimeAPI extends baseService {
  constructor() {
    super();
  }

  postCreateShowTimes = (data) => {
    return this.post(`/api/showtime/createShowtime`, data);
  };
  deleteShowTimes = (id) => {
    return this.delete(`/api/showtime/deleteShowtime/${id}`);
  };
 
  getAllShowtime = () => {
    return this.get("/api/showtime/getAllShowtime");
  };

  getDetailShowtime = (_id) => {
    return this.get(`/api/showtime/getDetailShowtime/${_id}`);
  };
  updateShowtime = (id, showtime) => {
    return this.patch(`/api/showtime/updateShowtime/${id}`, showtime);
  };
  postCreateTicket = (data) => {
    return this.post(`/api/ticket/createTicket`, data);
  };
}
export const bookingApi = new showtimeAPI();
