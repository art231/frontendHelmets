import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers";

const logger = createLogger();
export const history = createBrowserHistory();

// const createStoreWithMiddleware = applyMiddleware(
//     thunk,
//     routerMiddleware(history),
//     logger
// )(createStore);
//
// export default function configureStore(initialState) {
//     return createStoreWithMiddleware(rootReducer(history), initialState);
// }

export default ({history}) => {
    const composeEnhancers = (
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose;
    const reducers = rootReducer({history});
    const store = createStore(reducers, composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            logger
        )
    ));

    return store;

};
