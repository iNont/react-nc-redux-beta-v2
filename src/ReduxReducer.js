import CTRL from './CTRL'
import * as Utils from './Utils';

const SET_STATE = "SET_STATE";
const RESET_STATE = "RESET_STATE";

const generateStore = (reactNCState) => ({
  reactNCState: reactNCState
})

export default (store = generateStore(Utils.deepCopy(CTRL.initialState)), action) => {
  switch (action.key) {
    case SET_STATE:
      if(action.callback) {
        console.warn('React NC Redux does not support callback function in setState()');
      }
      let currentState = store.reactNCState;
      let updatingState = currentState;
      if(typeof action.payload === 'function') {
        updatingState = action.payload(currentState);
      }
      else {
        updatingState = action.payload;
      }
      return generateStore({
        ...currentState,
        ...updatingState
      });
    case RESET_STATE:
      return generateStore(Utils.deepCopy(CTRL.initialState));
    default:
      return store;
  }
}

export const setState = (type = "UNKNOWN", state = {}, callback) => ({
  key: SET_STATE,
  type: type,
  payload: state,
  callback: callback
});

export const resetState = () => ({
  key: RESET_STATE,
  type: RESET_STATE
});
