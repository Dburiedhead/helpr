import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard';
import NewRequest from './NewRequest';
import Profile from './Profile';
import Request from './Request';
import Requests from './Requests';
import Test from './Test';
import NotFound from './NotFound';
import Conversation from './Messenger/Conversation';
import ConversationsList from './Messenger/ConversationsList'

// import Menu from './Menu';

const App = () => {
    return (
        <div className="helpr-app">
            <Switch>
                <Route exact path='/' component = { Requests } />
                <Route exact path='/request/:id' component = { Request } />
                <Route exact path='/new_request/' component = { NewRequest } />
                <Route exact path='/dashboard/' component = { Dashboard } />
                <Route exact path='/profile/' component = { Profile } />
                <Route exact path='/conversations/' component = { ConversationsList } />
                <Route exact path='/conversations/conversation/:id' component = { Conversation } />
                <Route component = { NotFound } />
                {/* <Route exact path='/' component = { GuestHome } /> */}
            </Switch>
        </div>
    )
}

export default App