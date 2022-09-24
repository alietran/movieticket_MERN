const stateDefault = {
  textComment: null,
  commentList: null,
  resetText:null
};

export const CommentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ADD_COMMENT_SUCCESS": {
      return {
        ...state,
        textComment: action.comment,
  
      };
    }
    case "GET_ALL_COMMENTS": {
      return { ...state, commentList: action.comment };
    }
    case "RESET_COMMENT": {
      return { ...state, resetText: true };
    }

    default:
      return { ...state };
  }
};
