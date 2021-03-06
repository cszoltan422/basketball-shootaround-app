import { all } from 'redux-saga/effects';
import {applicationMountedWatcherSaga} from './application/application-saga';
import {submitShootAroundWatcherSaga} from './add-shootaround/add-shootaround-saga';
import {dashboardDateRangeChangedWatcherSaga} from './dashboard/dashboard-saga';

export default function* rootSaga() {
    yield all([
        applicationMountedWatcherSaga(),
        submitShootAroundWatcherSaga(),
        dashboardDateRangeChangedWatcherSaga()
    ]);
}