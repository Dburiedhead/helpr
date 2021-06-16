import React from 'react'
import axios from "axios";
import TestItems from "./TestItems";
import TestItem from "./TestItem";

class TestApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { testItems: [] };
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        axios.get(`/api/v1/conversations/${this.props.match.params.id}`)
        .then(response => {
            const todoItems = response.data;
            this.setState({ todoItems });
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <TestItems>
                {this.state.testItems.map(testItem => (
                    <TestItem key={testItems.id} testItem={testItem} />
                ))}
            </TestItems>
        )
    }
}

export default TestApp