import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import NameForm from './containers/NameForm.js'
import TableR from './containers/TableR.js'
import { connect } from 'react-redux'

import { updateVisible } from './actions/SimpleAction'
class App extends Component {
  constructor (props) {
    super(props)
    // this.press = this.press.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()')
  }
  componentWillMount () {
    console.log('componentWillMount()')
  }
  componentDidMount () {
    console.log('componentDidMount()')
  }
  componentWillUnmount () {
    console.log('componentWillUnmount()')
  }

  press = () => {
    // this.setState(prevState => ({ childVisible: !prevState.childVisible }))
    return dispatch => {
      dispatch(updateVisible(this.props.childVisible))
    }
  }

  render () {
    return (
      <div className='App'>
        {this.props.childVisible && <NameForm />}
        <TableR />
        <button onClick={() => this.props.dispatch(this.press())}>
          {this.props.label}
        </button>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    childVisible: state.workWithApp.childVisible,
    label: state.workWithApp.label
  }
}
export default connect(mapStateToProps)(App)
