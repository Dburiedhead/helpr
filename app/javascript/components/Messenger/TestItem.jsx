import React from 'react'

class TestItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { testItem } = this.props
        return (
            <div id='chat-feed'>
                <h3>Chat Feed:</h3>
                <div id='messages'>
                    {
                        this.props.isConversationLoaded ?
                            <ListGroup variant='flush'>
                                {this.props.conversation.messages.map(({ id, text, user_id, created_at }) => {
                                    <ListGroup.Item key={id}>{text} - {user_id} - {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} </ListGroup.Item>
                                })}
                            </ListGroup>
                        :
                        <h3>This conversation has no messages yet - be the first to post!</h3>
                    }
                </div>
            </div>
        )
    }
}

export default TestItem
