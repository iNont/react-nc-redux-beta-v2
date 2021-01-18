// import React from 'react';
import CTRL from './CTRL';
import { connect } from 'react-redux';
import * as Utils from './Utils';

const StateConnect = (mapStateToUpdate = state => Utils.deepCopy(CTRL.state), withRef = false, connectParams) => (Comp) => {
  let mapStateToUpdateAll = CTRL.config.mapStateToUpdateAll || {};
  let fromAll = typeof mapStateToUpdateAll === 'object' ? () => mapStateToUpdateAll : mapStateToUpdateAll;
  let fromMap = typeof mapStateToUpdate === 'object' ? () => mapStateToUpdate : mapStateToUpdate;
  let ConnectedComp = connect(
    (store, ...params) => ({
        reactNCStateStringified: JSON.stringify({
            ...fromAll(store.reactNCState, ...params),
            ...fromMap(store.reactNCState, ...params)
        })
    })
    , ...(Array.isArray(connectParams) ? connectParams : [
        null, null, { withRef }
    ])
  )(Comp);
  return ConnectedComp;
}

export default StateConnect;
