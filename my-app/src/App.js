import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import NameForm from './Comp/NameForm.js'
import TableR from './Comp/TableR.js'
// import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      childVisible: true,
      label: 'Скрыть/Показать'
    }

    this.press = this.press.bind(this)
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

  updateData = value => {
    this.setState({
      data: value
    })
  }

  press () {
    this.setState(prevState => ({ childVisible: !prevState.childVisible }))
  }

  render () {
    return (
      <div className='App'>
        {this.state.childVisible && <NameForm updateData={this.updateData} />}
        <TableR data={this.state.data} />
        <button onClick={this.press}>
          {this.state.label}
        </button>
      </div>
    )
  }
}

export default App
