import { baseService } from "./baseService";

// router của user api
export class cinemaAPI extends baseService {
  constructor() {
    super();
  }

  createCinema = (cinema) => {
    return this.post("/api/cinema/createCinema", cinema);
  };
  getAllCinema = () => {
    return this.get("/api/cinema/getAllCinema");
  };
  deleteCinema = (id) => {
    return this.delete(`/api/cinema/deleteCinema/${id}`);
  };
  updateCinema = (id, cinema) => {
  
    return this.patch(`/api/Cinema/updateCinema/${id}`, cinema);
  };
  getDetailCinema = (id) => {
    return this.get(`/api/Cinema/getDetailCinema/${id}`);
  };
}
export const NewCinemaAPI = new cinemaAPI();
