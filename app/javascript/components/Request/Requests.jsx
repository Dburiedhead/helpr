import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Counter from '../Counter'
import axios from 'axios';
import Map from '../Map/Map';
import Filters from '../Filters';
import RequestCard from './RequestCard'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';



class Requests extends Component {

    state = {
        user_requests: [],
        user_responses: [],
        viewportResults: [],
        isLogged: true
    }

    constructor(props) {
        super();
        axios.get(`/api/v1/requests/`)
        .then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
        .catch(error => {
            error.response.status == 401 ? this.setState({isLogged : false}) : console.log(error);
        });

        // axios.get('/api/v1/is_signed_in')
        // .then(res => {
        //     console.log(res.data)
        //     res.data == true ? this.setState({isLogged : true}) : this.setState({isLogged : false})
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }

    handleResults = (res) => {
        this.setState({ viewportResults: res })
    }

    render() {
        return (
            <div className="container">
                {this.state.isLogged == true ?
                    <Row>
                        <Col md={6}>
                            <Map locator={true} search={true} marker={this.state.user_requests} show_results={true} parentCallback={this.handleResults} />
                            <h2><Counter requests={this.state.user_requests} />unfulfilled requests</h2>
                        </Col>
                        <Col md={6}>
                            <Filters />
                            {/* Filter unfulfilled */}
                            {this.state.viewportResults.map(({ id, title, description, latitude, longitude, request_type, user_id, fulfilled, created_at, updated_at }, index) =>
                                <RequestCard
                                    key={index}
                                    id={id}
                                    title={title}
                                    description={description}
                                    latitude={latitude}
                                    longitude={longitude}
                                    request_type={request_type}
                                    user_id={user_id}
                                    fulfilled={fulfilled}
                                    created={created_at}
                                    updtated={updated_at}
                                />
                            )}
                        </Col>
                    </Row>
                    :
                    <div className="vw-100 vh-100 primary-color align-items-center justify-content-center">
                        <Container className="secondary-color" style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
                            <Jumbotron fluid className="bg-transparent">
                                <h1 className="display-4">Helpr Guest Home</h1>
                                <p className="lead">
                                    Help people around you and get help from them
                                </p>
                                <hr className="my-4" />
                                <Link to="/users/sign_in" className="btn btn-lg custom-button" role="button">
                                    Sign in
                                </Link>
                                {/* <Button className="btn btn-lg custom-button" href="/users/sign_in">Sign in</Button> */}
                            </Jumbotron>
                            <Row>
                                <Col>
                                    <h2>Presentation</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>Feed</h2>
                                    <p>Latest published requests</p>
                                    <p>Latest fulfilled requests</p>
                                    <p>New members</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>}
            </div>
        )
    }
}

export default Requests;