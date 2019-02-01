import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

export default (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
// export default (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(thunk));
