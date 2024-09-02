import { call, put, takeEvery } from "redux-saga/effects";
import { setSongs, setStats, fetchSongs, fetchStats } from "./songsSlice/songsSlice";
import { fetchSongsFromAPI, fetchStatsFromAPI } from "./api/api";
import { Songs, Statis } from "./api/apiTypes";

function* fetchSongsSaga(): Generator<unknown, void, Songs[]> {
  try {
    const songs: Songs[] = yield call(fetchSongsFromAPI);
    yield put(setSongs(songs));
  } catch (error) {
    console.error("Failed to fetch songs", error);
  }
}

function* fetchStatsSaga(): Generator<unknown, void, Statis> {
  try {
    const stats: Statis = yield call(fetchStatsFromAPI);
    yield put(setStats(stats));
  } catch (error) {
    console.error("Failed to fetch stats", error);
  }
}

export function* songsSaga() {
 yield takeEvery(fetchSongs.fulfilled.type, fetchSongsSaga);
 yield takeEvery(fetchStats.type, fetchStatsSaga);
}
