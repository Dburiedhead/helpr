import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function GuestHome(){
    return (
        <div className="vw-100 vh-100 primary-color align-items-center justify-content-center">
            <Container className="secondary-color" style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
                <Jumbotron fluid className="bg-transparent">
                        <h1 className="display-4">Helpr Guest Home</h1>
                        <p className="lead">
                            Help people around you and get help from them
                        </p>
                        <hr className="my-4" />
                        {/* <Link
                            to="/users/sign_in"
                            className="btn btn-lg custom-button"
                            role="button"
                        >
                            Sign in
                        </Link> */}
                        <Button className="btn btn-lg custom-button" href="/users/sign_in">Sign in</Button>
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
        </div>
    );
} 