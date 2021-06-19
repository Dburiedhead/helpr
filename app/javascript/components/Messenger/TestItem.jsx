import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

class TestItem extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
            
    //     }
    // }
    render() {
        const { testItems } = this.props
        return (
            <div id='chat-feed'>
                <div id='messages'>
                    <ListGroup variant='flush'>
                        {this.props.testItems.map(({ id, text, user_id, created_at }, index) => 
                            <ListGroup.Item key={index}>{text} - {user_id} - {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </div>
        )
    }
}

export default TestItem
