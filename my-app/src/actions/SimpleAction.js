import * as types from '../constants/ActionTypes'
import axios from 'axios'

export const addData = data => {
  return {
    type: types.ADD_DATA,
    data
  }
}

export const updateVisible = childVisible => {
  console.log(types.UPDATE_VISIBLE)
  return {
    type: types.UPDATE_VISIBLE,
    childVisible
  }
}

export const updateForm = (name, fromTo) => {
  return {
    type: types.UPDATE_FORM,
    name,
    [name]: fromTo
  }
}

const addTodoStarted = () => ({
  type: 'ADD_TODO_STARTED'
})

export const getHits = (from, to) => {
  // 2018-09-06
  return dispatch => {
    dispatch(addTodoStarted())
    axios
      .get(
        `https://us-central1-dokis-12eaa.cloudfunctions.net/generateHits?start=${from}&end=${to}`
      )
      .then(response => {
        // this.props.updateData(response.data)
        dispatch(addData(response.data))
        // this.props.sendData(response.data)
      })
  }
}
