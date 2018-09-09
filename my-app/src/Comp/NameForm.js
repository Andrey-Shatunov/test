import React, { Component } from 'react'
import axios from 'axios'

export default class NameForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      value1: '',
      class: 'off'
    }
    this.handleChangeFrom = this.handleChangeFrom.bind(this)
    this.handleChangeTo = this.handleChangeTo.bind(this)
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
  handleChangeTo (event) {
    this.setState({ value1: event.target.value })
  }

  handleChangeFrom (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    // 2018-09-06
    axios
      .get(
        `https://us-central1-dokis-12eaa.cloudfunctions.net/generateHits?start=${this.state.value}&end=${this.state.value1}`
      )
      .then(response => {
        this.props.updateData(response.data)
        console.log(response.data)
      })

    event.preventDefault()
  }

  render () {
    return (
      <div>
        <h1>Hello</h1>
        <form class='olo' onSubmit={this.handleSubmit}>
          <label>
            From:
            <input
              type='text'
              value={this.state.value}
              onChange={this.handleChangeFrom}
            />
            To:
            <input
              type='text'
              value={this.state.value1}
              onChange={this.handleChangeTo}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}
