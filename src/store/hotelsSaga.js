import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchDestinationsRequest,
    fetchDestinationsSuccess,
    fetchDestinationsFailure,
    fetchHotelsRequest,
    fetchHotelsSuccess,
    fetchHotelsFailure,
} from "./hotelsSlice";

function* fetchDestinationsSaga() {
    try {
        const response = yield call(axios.get, "http://localhost:5000/hotels");
        const uniqueCities = [...new Set(response.data.map((hotel) => hotel.city))];
        yield put(fetchDestinationsSuccess(uniqueCities));
    } catch (error) {
        yield put(fetchDestinationsFailure(error.message));
    }
}

function* fetchHotelsSaga(action) {
    try {
        const response = yield call(axios.get, "http://localhost:5000/hotels");
        const filteredHotels = response.data.filter(
            (hotel) => hotel.city.toLowerCase() === action.payload.toLowerCase()
        );
        yield put(fetchHotelsSuccess(filteredHotels));
    } catch (error) {
        yield put(fetchHotelsFailure(error.message));
    }
}

export default function* hotelsSaga() {
    yield takeLatest(fetchDestinationsRequest.type, fetchDestinationsSaga);
    yield takeLatest(fetchHotelsRequest.type, fetchHotelsSaga);
}
