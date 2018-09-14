import * as types from '../constants/ActionTypes'

export function addData (data) {
  return {
    type: types.ADD_DATA,
    data
  }
}

export function updateVisible (childVisible) {
  console.log(types.UPDATE_VISIBLE)
  return {
    type: types.UPDATE_VISIBLE,
    childVisible
  }
}

export function updateForm (name, fromTo) {
  return {
    type: types.UPDATE_FORM,
    name,
    [name]: fromTo
  }
}
