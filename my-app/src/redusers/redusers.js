export function workWithData (state, action) {
  if (typeof state === 'undefined') {
    return { data: [], loading: false }
  }
  switch (action.type) {
    case 'ADD_DATA':
      return { ...state, data: action.data }
    case 'ADD_TODO_STARTED':
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export function workWithApp (state, action) {
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

export function workWithForm (state, action) {
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
