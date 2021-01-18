import React, { Component } from 'react';
import CTRL from './CTRL';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxReducer from './ReduxReducer';
import * as Utils from './Utils';

const StateControl = (Comp) => {
  class StateControlComponent extends Component {
    constructor(props) {
      super(props);
      CTRL.app = this;
      this.store = createStore(
        reduxReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
    render() {
      const props = this.props;
      return (
        <Provider store={this.store}>
          <Comp {...props} />
        </Provider>
      );
    }
  }
  StateControlComponent.displayName = `StateControl(${Utils.getDisplayName(Comp)})`
  return StateControlComponent;
}

export default StateControl;
