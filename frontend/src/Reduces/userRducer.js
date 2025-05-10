// src/redux/userReducer.js
const initialState = {
    user: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'LOG_OUT':
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default userReducer;
  