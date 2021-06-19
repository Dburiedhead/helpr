import React, { Component } from 'react';

class WebSocket extends Component {
    componentDidMount() {
        this.props.getRoomData(window.location.href.match(/\d+$/)[0])
        // console.log('cableAppp is', this.props.cableApp);
        // this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create({
        //     channel: 'ConversationsChannel',
        //     room: window.location.href.match(/\d+$/)[0]
        // }, 
        // {
        //     received: (updatedRoom) => {
        //         console.log('received')
        //         this.props.updateApp(updatedRoom)
        //     }
        // })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default WebSocket