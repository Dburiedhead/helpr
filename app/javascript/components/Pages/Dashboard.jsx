import React, { Component, useState, useCallback } from 'react';
import { Tabs, Tab, Container, Table, Modal, Button, Alert } from 'react-bootstrap';
import { Form, Dropdown, Radio } from 'semantic-ui-react'
// import { Form, Radio } from 'formsy-semantic-ui-react';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders';
import { Link } from 'react-router-dom';
import EditRequest from '../Request/EditRequest';
import * as Icon from 'react-feather';

export default class Dashboard extends Component {

    handleRepublish = (id) => {
        const data = {
            request_status: 'opened'
        }
        console.log("request is", id, "data is set to ", data);
        setAxiosHeaders()
        axios.put(`/api/v1/requests/${id}`, data)
            .then(res => {
                if (res.request.status === 200) {
                    this.setState({ showAlert: true })
                    setTimeout(() => {
                        this.setState({ showAlert: false })
                    }, 5000);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    state = {
        user_requests: [],
        user_responses: [],
        showRepublished: false,
        showCancelAlert: false
    }

    constructor() {
        super();

        axios.get('/api/v1/current_user_requests/')
            .then(res => {
                let user_requests = res.data
                this.setState({ user_requests })
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('/api/v1/current_user_responses/')
            .then(res => {
                let user_responses = res.data
                this.setState({ user_responses })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        return (
            <Container>
                <Alert variant='success' show={this.state.showRepublished}>
                    <Alert.Heading>
                        Request republished!
                    </Alert.Heading>
                    <p>You will find answers in the chat, check regularly</p>
                </Alert>
                <Tabs
                    id="controlled-tab"
                    defaultActiveKey='requests'
                >
                    <Tab eventKey="requests" title="My Requests">
                        {this.state.user_requests.length > 0 ?
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Last update</th>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Fulfilled</th>
                                        <th>Description</th>
                                        <th>Request page</th>
                                        <th>Edit</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_requests.map((
                                        {
                                            id,
                                            request_type,
                                            title,
                                            created_at,
                                            description,
                                            request_status,
                                            fulfilled,
                                            latitude,
                                            longitude,
                                            updated_at,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(`${created_at}`).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            <td>{updated_at !== created_at ? new Date(`${updated_at}`).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : 'No updated yet'}</td>
                                            <td>{request_type}</td>
                                            <td>{title}</td>
                                            <td>{request_status}
                                                <br />
                                                {request_status == 'hidden' ?
                                                    <Button variant="outline-primary" onClick={() => this.handleRepublish(id)}>Republish</Button>
                                                    : null}
                                            </td>
                                            <td>
                                                {fulfilled == true ? <Button variant="text" disabled><Icon.CheckCircle color="#B6EEA6" /></Button>
                                                    : <ConfirmFulfilled id={id} />
                                                    // <Button variant="primary" onClick={() => this.ConfirmFulfilled(id)}>Click to fulfill</Button>
                                                }
                                            </td>
                                            <td>{description}</td>
                                            <td><a href={`/request/${id}`} className="icon"><Icon.Eye color="#362C28" /></a></td>
                                            <td>
                                                <EditRequestModal
                                                    key={id}
                                                    id={id}
                                                    description={description}
                                                    title={title}
                                                    request_type={request_type}
                                                    latitude={latitude}
                                                    longitude={longitude}
                                                />
                                            </td>
                                            <td>
                                                <ConfirmDelete id={id} />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            :
                            <h2>You haven't posted any request yet</h2>
                        }
                    </Tab>
                    <Tab eventKey="responses" title="My responses">
                        {this.state.user_responses.length > 0 ?
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Last update</th>
                                        <th>Selected to fulfill the request</th>
                                        <th>Request</th>
                                        <th>Cancel Help</th>
                                        <th>Request page</th>
                                        <th>Conversation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_responses.map((
                                        {
                                            id,
                                            request_id,
                                            title,
                                            created_at,
                                            updated_at,
                                            selected,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(created_at).toLocaleDateString()}</td>
                                            <td>{updated_at !== created_at ? new Date(`${updated_at}`).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) : 'No updated yet'}</td>
                                            <td>{selected === true ? 'Yes' : 'No'}</td>
                                            <td>{title}</td>
                                            <td><ConfirmCancel id={id} /></td>
                                            <td><Link to={`/request/${request_id}`} className="icon"><Icon.Eye color="#362C28" /></Link></td>
                                            <td>
                                                <Link to={`/conversations/${id}`} className="icon"><Icon.MessageCircle color="#A6E1FA" /></Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            :
                            <h2>You haven't answered to any request yet</h2>
                        }
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}

export function ConfirmFulfilled(req) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [resId, setresId] = useState(0);
    const data = useCallback((data) => {
        setresId(data);
    }, []);
    return (
        <>
            <Button variant="link" onClick={handleShow}>
                <Icon.Circle color="#362C28" />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Set to fulfill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to set this request to fulfilled ? This action can't be reversed
                    </p>
                    <h3>Which Helpr's conversation fulfilled your request ?</h3>

                    <SelectConversation id={req.id} data={data}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const req_data = {
                            fulfilled: true
                        }
                        const resp_data = {
                            selected: true
                        }
                        
                        setAxiosHeaders()
                        axios.put(`/api/v1/conversations/${resId}`, resp_data)
                        // axios.put(`/api/v1/requests/${req.id}`, req_data)
                        // .then(res => {
                        //     if (res.status == 200) { 
                        //         axios.put(`/api/v1/conversations/${resId}`, resp_data)
                        //     }
                        // })
                        // .catch(error => {
                        //     console.log(error);
                        // });
                    }
                    }>
                        Fulfill
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class SelectConversation extends Component {

    state = {
        conversations: [],
        value: '',
        label: ''
    }

    componentDidMount() {
        axios.get('/api/v1/current_user_help/')
        .then(res => {
            let conversations = res.data.filter((help) => help.request_id == this.props.id)
            this.setState({ conversations })
          })
        .catch(error => {
            console.log(error);
        });
    }

    handleChange = (e, { value, label }) => (this.setState({ value, label }), console.log(value, label), this.props.data(value))

    render() {
        return (
            <div>
                { this.state.conversations.length > 0 ?
                    <Form>
                        <Form.Field>
                            Selected: <b>{this.state.label}</b>
                        </Form.Field>
                        {this.state.conversations.map((
                            { title, id, helpr_id }, index) =>
                            <Form.Field key={index} >
                                <Radio
                                    label={`${title} with user ${helpr_id}`}
                                    name='radioGroup'
                                    value={id}
                                    checked={this.state.value == {id}}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        )}
                    </Form>
                    : <p>There's no conversation related to this request</p>
                }
            </div>
        )
    }
}

export function EditRequestModal(req) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" onClick={() => handleShow(req)}><Icon.Edit2 color="#4c4c4c" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditRequest
                        id={req.id}
                        description={req.description}
                        title={req.title}
                        request_type={req.request_type}
                        latitude={req.latitude}
                        longitude={req.longitude}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

export function ConfirmDelete(req) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" onClick={handleShow}>
                <Icon.Trash2 color="#EF7B45" />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete this request ? This action can't be reversed
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                        setAxiosHeaders()
                        axios.delete(`/api/v1/requests/${req.id}`)
                            .then(res => {
                                console.log('Request deleted', res)
                                if (res.status == 204) { window.location.reload() }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                    }>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ConfirmCancel(conv) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" onClick={handleShow}>
                <Icon.XCircle color="#EF7B45" />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Set to fulfill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to cancel your help ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const data = {
                            fulfilled: true
                        }
                        setAxiosHeaders()
                        axios.delete(`/api/v1/conversations/${conv.id}`)
                            .then(res => {
                                console.log('Help deleted', res)
                                if (res.status == 204) { window.location.reload() }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                    }>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}