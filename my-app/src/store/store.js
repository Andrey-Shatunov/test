import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { workWithData, workWithApp, workWithForm } from '../redusers/redusers'

const reducers = combineReducers({
  workWithData: workWithData,
  workWithApp: workWithApp,
  workWithForm: workWithForm
})

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  initialState,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
)
// const store = createStore(
//   reducers,
//   initialState,
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// var store = createStore(workWithData)

export default store
