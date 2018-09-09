import React, { Component } from 'react'
import axios from 'axios'

export default class TableR extends Component {
  state = {
    name: 'Бумеранг вернулся назад'
  }
  componentWillReceiveProps (nextProps) {
    console.log('TablecomponentWillReceiveProps()')
  }
  componentWillMount () {
    console.log('TablecomponentWillMount()')
  }
  componentDidMount () {
    console.log('TablecomponentDidMount()')
  }
  componentWillUnmount () {
    console.log('TablecomponentWillUnmount()')
  }
  _renderObject () {
    return Object.entries(this.props.data).map(([key, value], i) => {
      return (
        <tr key={key}>
          <td>
            {key}
          </td>
          <td>
            {value}
          </td>
        </tr>
      )
    })
  }
  render () {
    return (
      <table className='center-div'>
        <tbody>
          {this._renderObject()}
        </tbody>
      </table>
    )
  }
}
