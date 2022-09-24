import { baseService } from "./baseService";

// router của user api
export class commentAPI extends baseService {
  constructor() {
    super();
  }

  addComment = (comment) => {
    return this.post("/api/comment/addComment", comment);
  };
  getAllComment = () =>{
     return this.get("/api/comment/getAllComment");
  }
}
  export const NewCommentAPI = new commentAPI(); 