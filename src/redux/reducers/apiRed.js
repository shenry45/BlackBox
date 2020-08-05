import { SEARCH_PENDING, SEARCH_SUCCESS, SEARCH_FAILURE } from '../actions/Search';

const initialState = {
  friends: [],
  loading: false,
  success: false,
  failure: false
}

export const apiRed = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PENDING: 
      return {
        ...state,
        loading: true
      }
    case SEARCH_SUCCESS: 
      return {
        ...state,
        friends: action.payload
    }
    case SEARCH_FAILURE: 
      return {
        ...state,
        failure: true
    }
    default:
      return state;
  }
}