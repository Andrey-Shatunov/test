import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableR extends Component {
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
const mapStateToProps = function (state) {
  return {
    data: state.workWithData.data
  }
}
export default connect(mapStateToProps)(TableR)
