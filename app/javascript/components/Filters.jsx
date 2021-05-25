import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';


class Filters extends Component {
    render() {
        return (
            <div>
                <Navbar className="bg-light justify-content-md-center">
                <p>On mobile, set the filters as icon to dropdown </p>
                    <Form inline>
                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                            Filter requests
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                        >
                            <option value="0">Sort...</option>
                            <option value="1">Latest</option>
                            <option value="2">Oldest</option>
                        </Form.Control>
                    </Form>
                </Navbar>
            </div>
        )
    }
}
  
export default Filters;