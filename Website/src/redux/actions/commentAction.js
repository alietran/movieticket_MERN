import { NewCommentAPI } from "../../api/commentAPI";
export const addComment = (comment) => {
  return async (dispatch) => {
    try {
      const content = await NewCommentAPI.addComment(comment);
      console.log("result", content);
      dispatch({
        type: "ADD_COMMENT_SUCCESS",
        comment: content.data,
      });
    } catch (error) {
      dispatch({
        type: "ADD_COMMENT_FAIL",
        error: error.response?.data.message,
      });
    }
  };
};
export const getAllComment = () => {
  return async (dispatch) => {
    try {
      const content = await NewCommentAPI.getAllComment();
      console.log("result", content);
      dispatch({
        type: "GET_ALL_COMMENTS",
        comment: content.data,
      });
    } catch (error) {
      console.log("error", error);
      // console.log("error", error.response?.data.message);
    }
  };
};
export const resetComment = () => {
  return async (dispatch) => {
    dispatch({
      type: "RESET_COMMENT",
    });
  };
};