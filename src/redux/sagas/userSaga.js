import axios from 'axios';
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getUserInfo() {
  try{
    const userInfoResponse = yield call(axios.get, 'api/user/info');
    yield put({type: 'SET_USER_INFO', payload: userInfoResponse.data});
  } catch(err) {
    console.log(err);
  }
}

function* userSetAttended(action) {
  try {
    yield call(axios.put, 'api/user/attend', action.payload);
  } catch(err) {
    console.log(err);
  }
}

function* userUpdateAccountInfo(action) {
  try {
    yield call(axios.put, 'api/user/update', action.payload);
  } catch(err) {
    console.log(err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('GET_USER_INFO', getUserInfo);
  yield takeEvery('USER_ATTEND', userSetAttended);
  yield takeEvery('USER_UPDATE_ACCOUNT_INFO', userUpdateAccountInfo);
}

export default userSaga;
