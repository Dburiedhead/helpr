import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios';
import Map from './Map';
import Test from './Test';
import Filters from './Filters';
import RequestCard from './RequestCard'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function Counter(props) {
    const count = props.requests.filter((ur) => ur.fulfilled === false).length;
    return (
        <p>{count}</p>
    )
}

class Requests extends Component {

    state = {
        user_requests: [],
        user_responses: []
    }

    constructor() {
        super();
        axios.get(`/api/v1/requests/`).then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Container style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
                This is request#show
                <Map locator={true} search={true} marker={this.state.user_requests} />
                <Test marker={this.state.user_requests} />
                
                <h2><Counter requests = {this.state.user_requests} />unfulfilled requests</h2>
                <Link to='/new_request'>Single Request</Link>
                <p>All requests</p>
                <Filters />
                { this.state.user_requests.map(({id, title, description, latitude, longitude, request_type, user_id, fulfilled, created_at, updated_at}, index) =>
                    <RequestCard
                        key={index}
                        id = {id}
                        title = {title}
                        description = {description}
                        latitude = {latitude}
                        longitude = {longitude}
                        request_type = {request_type}
                        user_id = {user_id}
                        fulfilled = {fulfilled}
                        created = {created_at}
                        updtated = {updated_at}
                    />
                )}

            </Container>
        )
    }
}
  
export default Requests;