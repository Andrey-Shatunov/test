import React, { Component } from 'react'
import axios from 'axios'
import store from '../store/store'
import { connect } from 'react-redux'

class NameForm extends Component {
  constructor (props) {
    super(props)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    console.log('FormcomponentWillReceiveProps()')
  }
  componentWillMount () {
    console.log('FormcomponentWillMount()')
  }
  componentDidMount () {
    console.log('FormcomponentDidMount()')
  }
  componentWillUnmount () {
    console.log('FormcomponentWillUnmount()')
  }
  handleChangeInput (event) {
    const target = event.target
    const name = target.name
    // console.log('UPDATE_FORM')
    // console.log(name)
    store.dispatch({ type: 'UPDATE_FORM', name: [name], [name]: target.value })
    // this.setState({
    //   [name]: target.value
    // })
  }

  handleSubmit (event) {
    // 2018-09-06
    axios
      .get(
        `https://us-central1-dokis-12eaa.cloudfunctions.net/generateHits?start=${this.props.from}&end=${this.props.to}`
      )
      .then(response => {
        // this.props.updateData(response.data)
        store.dispatch({ type: 'ADD_DATA', data: response.data })
      })

    event.preventDefault()
  }

  render () {
    return (
      <div>
        <h1>Hello</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            From:
            <input
              name='from'
              type='text'
              value={this.props.from}
              onChange={this.handleChangeInput}
            />
            To:
            <input
              name='to'
              type='text'
              value={this.props.to}
              onChange={this.handleChangeInput}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

// const mapStateToProps = function (store) {
//   return {
//     data: store.data
//   }
// }

const mapStateToProps = function (state) {
  return {
    from: state.workWithForm.from,
    to: state.workWithForm.to
  }
}
export default connect(mapStateToProps)(NameForm)
