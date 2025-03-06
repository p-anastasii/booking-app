import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import hotelsReducer from "./hotelsSlice";
import hotelsSaga from "./hotelsSaga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([hotelsSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
