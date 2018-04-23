import {
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/posts'

export default function posts ( state = {}, action ) {
  const { allPosts, post, id } = action
  switch (action.type) {
    case GET_POSTS:
      return {
        allPosts,
      }
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
          allPosts,
      }
    case GET_SINGLE_POST:
      return {
        ...state,
          post,
      }
    case ADD_POST:
      return {
        ...state,
          allPosts: state.allPosts.concat(post),
      }
    case VOTE_POST:
      return {
        ...state,
          allPosts: state.allPosts.map((oldPost) => ((oldPost.id === post.id)? post: oldPost)),
      }
    case EDIT_POST:
    console.log(state.allPosts)
      return {
        ...state,
          allPosts: state.allPosts.map((oldPost) => ((oldPost.id === post.id)? post : oldPost)),
      }
    case DELETE_POST:
      return {
          ...state,
            allPosts: state.allPosts.filter((p) => (p.id !== id)),
      }
    default:
      return state
  }
}