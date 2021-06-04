import React, { Component } from 'react'; /* eslint-env node, browser */
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Tooltip from 'react-bootstrap/Tooltip';
// import Form from 'react-bootstrap/Form';
import { Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders';


const selectOptions = [
  { value: 'task', text: 'Task' },
  { value: 'material', text: 'Material' },
];

class EditRequest extends Component {

  constructor(props) {
    super()
    this.state = {
      id: props.id,
      description: props.description,
      title: props.title,
      request_type: props.request_type,
      latitude: props.latitude,
      longitude: props.longitude
    }
  }


  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const data = {
      id: this.state.id,
      description: this.state.description,
      title: this.state.title,
      request_type: this.state.request_type,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    };
    console.log(data)
    axios.put(`/api/v1/requests/${this.state.id}`, data).then(res => {
      console.log('Request edited', res)
      // if (res.status == 200){window.location.reload()}
    })
    .catch(error => {
      console.log(error);
    });
  };

  render() {

    // const { description, title, request_type, latitude, longitude } = this.state
    const errorLabel = <Label color="red" pointing />

    return (

      <Col>
        <Form
          // style={{ padding: '2vh 10vw' }}
          // onSubmit={this.handleSubmit}
          className="custom-classname-is-rendered"
          ref={(event) => { this.areaForm = event; }}
          onValidSubmit={this.handleSubmit.bind(this)}
        >
          <Form.Group>
            <Form.Input
              name='title'
              width={10}
              label='Title'
              placeholder='Doe'
              required
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              validations="minLength:5"
              errorLabel={errorLabel}
              validationErrors={{ minLength: 'Please enter your request title' }}

            />
            <Form.Dropdown
              name="request_type"
              width={2}
              label="Type"
              placeholder='Please select…'
              help="This is required"
              options={selectOptions}
              required
              selection
              value={this.state.request_type}
              onChange={this.handleChange}
              errorLabel={errorLabel}
              validationError= 'You need to select a type'

            />

          </Form.Group>
          <Form.TextArea
            name="description"
            label="Description"
            placeholder="I need ..."
            help="Max 300 characters."
            validations="maxLength:300"
            required
            validationErrors={{
              maxLength: 'Please provide less than 300 characters.',
            }}
            errorLabel={errorLabel}
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Input
              name='latitude'
              label='Latitude'
              width={5}
              // disabled
              // hidden
              required
              value={this.state.latitude}
              onChange={this.handleChange}
              errorLabel={errorLabel}
              validationError= 'You need to select an adress on the map to set these field'
            />
            <Form.Input
              name='longitude'
              width={5}
              label='Longitude'
              required
              // disabled
              // hidden
              value={this.state.longitude}
              onChange={this.handleChange}
              errorLabel={errorLabel}
              validationError= 'You need to select an adress on the map to set these field'
            />

          </Form.Group>
          <Form.Button className='submit-btn'>Submit</Form.Button>
        </Form>
      </Col>
    )
  }
}

export default EditRequest;