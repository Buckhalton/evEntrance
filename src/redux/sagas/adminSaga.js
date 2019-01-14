import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';

function* getEventAttendees(action) {
    try {
        console.log('eventId in adminSaga', action.payload);
        const eventAttendeesResponse = yield call(axios.get, `api/events/attendees/${action.payload}`)
        yield put({type: 'SET_EVENT_ATTENDEES', payload: eventAttendeesResponse.data});
    } catch(err) {
        console.log(err)
    }
}

function* setAttendance(action) {
    try {
        yield call(axios.put, 'api/events/attendee', action.payload);
        yield put({type: 'GET_EVENT_ATTENDEES', payload: action.refresh})
    } catch(err) {
        console.log(err);
    }
}



function* adminSaga() {
    yield takeEvery('GET_EVENT_ATTENDEES', getEventAttendees);
    yield takeEvery('SET_ATTENDANCE', setAttendance);
}

export default adminSaga;