import React from 'react'
import setAxiosHeaders from '../AxiosHeaders'
// import PropTypes from 'prop-types'

import axios from 'axios'
class TestForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleRef = React.createRef()
  }

  handleSubmit(e) {
    e.preventDefault()
    setAxiosHeaders()
    axios.post('/api/v1/messages', {
      message: {
        text: this.titleRef.current.value,
        conversation_id: window.location.href.match(/\d+$/)[0]
      },
    })
      .then(response => {
        const testItem = response.data
        this.props.createTestItem(testItem)
      })
      .catch(error => {
        console.log(error)
      })
    e.target.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="my-3">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              name="title"
              ref={this.titleRef}
              required
              className="form-control"
              id="title"
              placeholder="Write your test message item here..."
            />
          </div>
          <div className="form-group col-md-4">
            <button className="btn btn-outline-success btn-block">
              Add Test message Item
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default TestForm