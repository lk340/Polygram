import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
    const { logger } = require("redux-logger");
    middelwares.push(logger);
}

// export default (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
export default (preloadedState = {}) => createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
