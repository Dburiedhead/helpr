import React from 'react'

class TestItems extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}
export default TestItems