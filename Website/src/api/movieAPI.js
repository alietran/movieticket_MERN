import { baseService } from "./baseService";

// router của user api
export class movieAPI extends baseService {
  constructor() {
    super();
  }

  createMovie = (movie) => {
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return this.post("/api/movie/createMovie", formData);
  };
  getAllMovie = () => {
    return this.get("/api/movie/movieList");
  };
  deleteMovie = (id) => {
    return this.delete(`/api/movie/deleteMovie/${id}`);
  };
  updateMovie = (id, movie) => {
    // Chỉ sd khi truyền ảnh
    const formData = new FormData();
    for (const key in movie) {
      formData.append(key, movie[key]);
    }
    return this.patch(`/api/movie/updateMovie/${id}`, formData);
  };
  getDetailMovie = (id) => {
    return this.get(`/api/movie/getDetailMovie/${id}`);
  };
}
export const NewMovieAPI = new movieAPI();
