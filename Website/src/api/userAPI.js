import { baseService } from "./baseService";

// router của user api
export class userAPI extends baseService {
  constructor() {
    super();
  }

  login = (user) => {
    return this.post("/api/auth/login", user);
  };

  register = (user) => {
    return this.post("/api/auth/register", user);
  };
  getAllUser = () => {
    return this.get("/api/auth/getAllUser");
  };
  deleteUser = (id) => {
    return this.delete(`/api/auth/deleteUser/${id}`);
  };
  changePass = (user) => {
    return this.post("/api/auth/updatePassword", user);
  };
  updateUserAdmin = (user) => {
    return this.patch("/api/auth/updateUserAdmin", user);
  };
  updateUser = (id,user) => {
    return this.patch(`/api/auth/updateUser/${id}`,user);
  };
  updateMe = (user) => {
    return this.patch("/api/auth/updateMe",user);
  };

  getDetailUser = (_id) => {
    return this.get(`/api/auth/getOne/${_id}`);
  };

}
export const NewUserAPI = new userAPI();
