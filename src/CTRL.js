import * as Utils from './Utils';
import { setState, resetState } from './ReduxReducer';

const CTRL = {
  app: undefined,
  config: {},
  actions: {},
  debug: false,
  initialState: {},
  log: (...params) => { if(CTRL.debug) console.log(`React-nc: `, ...params); },
  setConfig: (config = {}) => {
    CTRL.config = config;
  },
  forceUpdate: () => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.forceUpdate();
  },
  createAction: (actionName, action) => {
    if(typeof actionName !== "string") {
      throw new Error("Invalid 'actionName' for createAction");
    }
    else if(!actionName) {
      throw new Error("'actionName' cannot be empty for createAction");
    }
    else if(CTRL.actions[actionName]) {
      throw new Error(`Action '${actionName}' is already defined`);
    }
    let result = (...args) => {
      if(typeof action === "object") {
        CTRL.setState(actionName)(action);
      }
      else if(typeof action === "function") {
        CTRL.setState(actionName)(action(...args));
      }
    }
    CTRL.actions[actionName] = result;
    return result;
  },
  removeAction: (actionName) => {
    if(!CTRL.actions[actionName]) {
      throw new Error(`Action '${actionName}' is not defined`);
    }
    delete CTRL.actions[actionName];
  },
  setState: (actionType = "UNKNOWN", callback) => {
      let state = undefined;

      if(typeof actionType !== "string") {
        state = actionType;
        actionType= "UNKNOWN";
      }

      const dispatch = (state, callback) => {
        if(!CTRL.app) {
          throw new Error("Application wrapped by StateControl is not found");
        }
        CTRL.app.store.dispatch(setState(actionType, state, callback));
      }

      if(typeof state !== "undefined") {
        dispatch(state, callback);
        return ;
      }

      return dispatch;
  },
  resetState: () => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.store.dispatch(resetState());
   },
  initializeState: state => {
    CTRL.initialState = state;
    if(CTRL.app) {
      CTRL.resetState();
    }
  },
  get state() {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    return CTRL.app.store.getState().reactNCState;
  }
};

export default CTRL;
