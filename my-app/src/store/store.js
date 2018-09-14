import { createStore, combineReducers } from 'redux'

function workWithData (state, action) {
  if (typeof state === 'undefined') {
    return { data: [] }
  }
  switch (action.type) {
    case 'ADD_DATA':
      return { ...state, data: action.data }
    default:
      return state
  }
}

function workWithApp (state, action) {
  if (typeof state === 'undefined') {
    return {
      childVisible: true,
      label: 'Скрыть/Показать'
    }
  }
  switch (action.type) {
    case 'UPDATE_VISIBLE':
      return { ...state, childVisible: !action.childVisible }
    default:
      return state
  }
}

function workWithForm (state, action) {
  if (typeof state === 'undefined') {
    return {
      from: '',
      to: ''
    }
  }
  switch (action.type) {
    case 'UPDATE_FORM':
      switch (action.name[0]) {
        case 'from':
          return { ...state, from: action.from }
        case 'to':
          return { ...state, to: action.to }
      }
      return { ...state }
    default:
      return state
  }
}

const reducers = combineReducers({
  workWithData: workWithData,
  workWithApp: workWithApp,
  workWithForm: workWithForm
})

const store = createStore(reducers)
// var store = createStore(workWithData)

export default store
