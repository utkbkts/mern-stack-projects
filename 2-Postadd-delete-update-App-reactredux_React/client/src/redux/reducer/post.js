const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default postReducer;
