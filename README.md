# React-NC-Redux-beta

Enhanced `react-nc` by using functionality of `react-redux` and simplified redux development steps.

## Installation

```
npm install redux react-redux react-nc-redux-beta
```

## Example

#### `index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CTRL from 'react-nc-redux-beta';

CTRL.initializeState({
  name: "iNont"
});

ReactDOM.render(
  <App />
, document.getElementById('root'));
```

#### `App.js`
```js
import React, { Component } from 'react';

import CTRL, { StateControl, StateConnect } from 'react-nc-redux-beta';

class App extends Component {
  render() {
    return (
      <div>
        My name is {CTRL.state.name}.
        <input value={CTRL.state.name} placeholder="Type to change name"
          onChange={(event)=>CTRL.setState({ name: event.target.value })} />
      </div>
    );
  }
}

const mapStateToUpdate = ({ name }) => ({ name });
export default StateControl(
  StateConnect(mapStateToUpdate)(App)
);
```

### HOC

#### `StateControl(Component)`

Using to wrap the component that want it to be the store provider.
*Mostly use for `App` component*

```js
export default StateControl(App);
```

#### `StateConnect(Component, withRef)`

Similar to `connect()` from react-redux, instead of using `connect()` to pass the props to Component, using `StateConnect()` to check if the Component need to be re-rendered or not.

```js
const mapStateToUpdate = (state) => ({
    displayName: state.displayName,
    loading: state.loading
});
export default StateConnect(mapStateToUpdate)(MyComp);
```

---

### Commands

#### `CTRL.initializeState(initialState)`

Set the initial state of CTRL.

```js
CTRL.initializeState({
  name: "iNont",
  title: "React-NC",
  array: [0, 1, 2, 3]
});

console.log(`My name is ${CTRL.state.name}.`);

// Output: My name is iNont.
```

#### `CTRL.setState(state)`

Set state of CTRL, you can use it likes `setState()` of react component.

```js
CTRL.initializeState({
  name: "iNont",
  title: "React-NC",
  array: [0, 1, 2, 3]
});
CTRL.setState({
  name: "Changed name"
});

console.log(CTRL.state);

/* Output: {
  name: "Changed name",
  title: "React-NC",
  array: [0, 1, 2, 3]
} */
```

You are allow to set the action name for logging on ReduxDevTool by `CTRL.setState(actionName)(state)`.

```js
CTRL.setState("CHANGE_NAME")({
  name: "New name"
});
```

#### `CTRL.createAction(actionName, action)`

You can create your own action to update the store instead of using `CTRL.setState()`.

The action created in `CTRL.actions` with the actionName you assigned.

```js
CTRL.createAction(
  "CHANGE_NAME",
  (newName) => ({
    name: newName
  })
);

CTRL.actions.CHANGE_NAME("My new name");

console.log(CTRL.state);

/* Output: {
  name: "My new name"
} */
```

#### `CTRL.removeAction(actionName)`

Remove the created action.

#### `CTRL.resetState()`

Reset CTRL state to initial state.
