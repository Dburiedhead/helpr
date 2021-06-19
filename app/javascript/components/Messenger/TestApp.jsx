import React, {Fragment} from 'react'
import axios from "axios";
// import TestItems from "./TestItems";
import TestItem from "./TestItem";
import ListGroup from 'react-bootstrap/ListGroup';
import ActionCable from 'actioncable'
import {ActionCableConsumer} from 'react-actioncable-provider';
import TestForm from "./TestForm";

// const cableApp = {
//     cable = ActionCable.createConsumer("ws://localhost:3000/cable")
// }

class TestApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testItems: []
        };
        this.getItems = this.getItems.bind(this);
        this.createTestItem = this.createTestItem.bind(this);
        this.cableApp = {}
        this.cableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
        this.updateApp = this.updateApp.bind(this)
    }

    componentDidMount() {
        this.getItems();
        this.createSubscription()
    }

    getItems() {
        axios.get(`/api/v1/conversations/${this.props.id}`)
            .then(response => {
                let testItems = response.data.messages;
                this.setState({ testItems });
            })
            .catch(error => {
                console.log(error);
            });
    }

    createTestItem(testItem) {
        const testItems = [testItem, ...this.state.testItems];
        this.setState({ testItems });
    }

    updateApp = testItem => {
        console.log('updated with this new message', testItem)
        this.setState({ testItems: [...this.state.testItems, testItem] })
    }

    createSubscription = () => {
        console.log('cableAppp is', this.cableApp);
        this.cableApp.room = this.cableApp.cable.subscriptions.create({
            channel: 'MessagesChannel',
            room: window.location.href.match(/\d+$/)[0]
        }, 
        {
            received: (message) => {
                console.log('received', message)
                this.updateApp(message)
            }
        })
    }

    render() {

        return (
            <>
                <TestForm createTestItem={this.createTestItem} />
                {/* <ActionCableConsumer 
                    channel={{
                        channel: 'MessagesChannel',
                        room: window.location.href.match(/\d+$/)[0]
                    }}
                    onReceived={this.updateApp}
                > */}
                    <TestItem testItems={this.state.testItems} getItems={this.getItems} />
                {/* </ActionCableConsumer> */}
            </>
        )
    }
}

export default TestApp