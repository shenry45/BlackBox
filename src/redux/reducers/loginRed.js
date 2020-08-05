

const initialState = {
  loginPending: false,
  loginSuccess: false,
  loginFail: false
}

export default function loginRed(state = initialState, action ) {
  switch(action.type) {

    case 'FETCHING_SMURFS':
      return {
        ...state,
        fetchingSmurfs: action.payload
      }

    default:
      return state;
  }
}