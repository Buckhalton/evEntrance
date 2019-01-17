import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import swal from 'sweetalert';

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

function* addEvent(action) {
    try {
        yield call(axios.post, 'api/events/add', action.payload);
        swal({
            title: "Event Added!",
            text: "This event has been added to the event list!",
            icon: "success",
            button: "Ok",
          });
        
    } catch(err) {
        console.log(err);
    }
}

function* getAllUsers() {
    try {
        const userListResponse = yield call(axios.get, 'api/user/userList');
        yield put({type: 'SET_ALL_USERS', payload: userListResponse.data});
    } catch(err) {
        console.log(err);
    }
}

function* changeUserRole(action) {
    try {
        yield call(axios.put, `api/user/changeRole`, action.payload);
        yield put({type: 'GET_ALL_USERS'});
    } catch(err) {
        console.log(err);
    }
}

function* deleteUser(action) {
    try {
        yield call(axios.delete, `api/user/delete/${action.payload}`);
        yield put({type: 'GET_ALL_USERS'});
    } catch(err) {
        console.log(err);
    }
}

function* adminSaga() {
    yield takeEvery('GET_EVENT_ATTENDEES', getEventAttendees);
    yield takeEvery('SET_ATTENDANCE', setAttendance);
    yield takeEvery('ADD_EVENT', addEvent);
    yield takeEvery('GET_ALL_USERS', getAllUsers);
    yield takeEvery('CHANGE_USER_ROLE', changeUserRole);
    yield takeEvery('DELETE_USER', deleteUser);
}

export default adminSaga;