import React, { Component } from 'react';

function getRoomData() {
    axios.get(`api/v1/conversations/${conv_id}`)
        // .then(response => response.json())
        .then(res => {
            this.setState({
                currentConversation: {
                    room: res.data,
                    users: res.data.attributes.users,
                    messages: res.data.attributes.messages
                }
            })
        })
}

const updateAppStateRoom = (newRoom) => {
    this.setState({
        currentConversation: {
            room: newRoom.room.data,
            users: newRoom.users,
            messages: newRoom.messages
        }
    })
  }

class RoomWebSocket extends Component {
    componentDidMount() {
        // if I don't use the getRoomData() function here, nothing renders on the RoomShow component
        getRoomData(window.location.href.match(/\d+$/)[0])
        // the subscriptions.create() method is sending params to the subscribed action in my RoomsChannel
        this.props.cableApp.conversation = this.props.cableApp.cable.subscriptions.create({
            channel: 'ConversationsChannel',
            conversations: window.location.href.match(/\d+$/)[0]
        }, 
        {
            received: (updatedConversation) => {
                updateAppStateRoom(updatedConversation)
            }
        })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default RoomWebSocket