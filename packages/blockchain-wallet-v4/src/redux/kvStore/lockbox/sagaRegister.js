import { takeLatest } from 'redux-saga/effects'
import * as AT from './actionTypes'
import sagas from './sagas'

export default ({ api }) => {
  const kvStoreLockboxSagas = sagas({ api })

  return function*() {
    yield takeLatest(
      AT.FETCH_METADATA_LOCKBOX,
      kvStoreLockboxSagas.fetchMetadataLockbox
    )
  }
}
