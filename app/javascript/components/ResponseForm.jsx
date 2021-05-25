import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class ResponseForm extends Component {

    state = {
        message: '',
        request_id: '',
    }

    constructor(props) {
        super();
        axios.get(`/api/v1/requests/${props.request_id}`).then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
            .catch(error => {
                console.log(error);
            });
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = (props) => {
        const data = {
            message: this.state.message,
            request_id: this.props.request_id
        };
        console.log(data)
        axios.post('/api/v1/responses', data)
            .then(res => {
                if (res.response.status === 201) {
                    alert('Response sent ! Thank you for your help');
                    this.areaForm.reset();
                }
            }
            )
            .catch(err => console.log(err))
    };

    render() {

        const { message, request_id } = this.state
        const errorLabel = <Label color="red" pointing />

        return (
            <Col>
                <Form
                    // style={{ padding: '2vh 10vw' }}
                    // onSubmit={this.handleSubmit}
                    className="custom-classname-is-rendered"
                    ref={(event) => { this.areaForm = event; }}
                    onValidSubmit={this.handleSubmit}
                >
                    <h2>Help {this.props.user_id}</h2>
                    <Form.TextArea
                        name="message"
                        label="Your Message"
                        placeholder="How can you help"
                        help="Max 150 characters."
                        validations="maxLength:150"
                        required
                        validationErrors={{
                            maxLength: 'Please provide less than 150 characters.',
                        }}
                        errorLabel={errorLabel}
                        value={message}
                        onChange={this.handleChange}
                    />
                    <Form.Button className='submit-btn'>Submit</Form.Button>
                </Form>
            </Col>
        )
    }
}

export default ResponseForm;