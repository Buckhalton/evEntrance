import axios from 'axios';
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

function* getUserEventList(){
  try {
    const userEventListResponse = yield call(axios.get, 'api/events/getUserEvents');
    yield put({type: 'SET_USER_EVENT_LIST', payload: userEventListResponse.data});
  } catch(err) {
    console.log('error in getUserEventList saga:', err);
  }
}

function* getUpcomingEventList(){
  try {
    const userUpcomingEventListResponse = yield call(axios.get, `api/events/getUpcomingEvents`);
    yield put({type: 'SET_USER_UPCOMING_EVENT_LIST', payload: userUpcomingEventListResponse.data })
  } catch(err) {
    console.log('error in getUpcomingEventList saga,', err);
  }
}

function* postUpcomingEventList(action){
  try {
    yield call(axios.post, 'api/events/postUpcomingEvents', action.payload);
    yield put({type: 'GET_USER_UPCOMING_EVENT_LIST'});
  } catch(err) {
    console.log(err);
  }
}

function* deleteUpcomingEvent(action){
  try{
    yield call(axios.delete, `api/events/${action.payload}`);
    yield put({type: 'GET_USER_UPCOMING_EVENT_LIST'});
  } catch(err) {
    console.log(err);
  }
}

function* eventListSaga() {
  yield takeEvery('GET_USER_EVENT_LIST', getUserEventList);
  yield takeEvery('POST_USER_UPCOMING_EVENT_LIST', postUpcomingEventList);
  yield takeEvery('GET_USER_UPCOMING_EVENT_LIST', getUpcomingEventList);
  yield takeEvery('DELETE_USER_UPCOMING_EVENT', deleteUpcomingEvent);
}

export default eventListSaga;