import React, { Component } from 'react'
import axios from 'axios'

export default class NameForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      from: '',
      to: '',
      class: 'off'
    }
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

    this.setState({
      [name]: target.value
    })
  }

  handleSubmit (event) {
    // 2018-09-06
    axios
      .get(
        `https://us-central1-dokis-12eaa.cloudfunctions.net/generateHits?start=${this.state.from}&end=${this.state.to}`
      )
      .then(response => {
        this.props.updateData(response.data)
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
              value={this.state.from}
              onChange={this.handleChangeInput}
            />
            To:
            <input
              name='to'
              type='text'
              value={this.state.to}
              onChange={this.handleChangeInput}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}
