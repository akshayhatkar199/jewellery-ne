import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reducers/userReducer";
const initialState = {
    sidebarShow: true,
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return { ...state, ...rest }
      default:
        return state
    }
  }
//creat us
// configureStore is used to creat store
export const store = configureStore({
    reducer: {
        userData:userReducer,
        changeState:changeState

    },
    devTools:false
  })

 export default store; 
