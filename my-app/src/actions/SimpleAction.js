import * as types from '../constants/ActionTypes'

export function addData (data) {
  return {
    type: types.ADD_DATA,
    data
  }
}
