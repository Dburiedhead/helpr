import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
// import Home from './Pages/Home'
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import NewRequest from './Request/NewRequest';
import Request from './Request/Request';
import Requests from './Request/Requests';
import Conversation from './Messenger/Conversation';
import ConversationsList from './Messenger/ConversationsList'

const App = () => {
    return (
        <div className="helpr-app">
            <Switch>
                <Route exact path='/' component = { Requests } />
                <Route exact path='/request/:id' component = { Request } />
                <Route exact path='/new_request/' component = { NewRequest } />
                <Route exact path='/dashboard/' component = { Dashboard } />
                <Route exact path='/profile/' component = { Profile } />
                <Route exact path='/users/profile/:id' component = { Profile } />
                <Route exact path='/conversations/' component = { ConversationsList } />
                <Route exact path='/conversations/:id' component = { Conversation } />
                <Route exact path="/users/edit" render={() => <div></div>} />
                <Route exact path="/users/sign_in" render={() => <div></div>} />
                <Route exact path="users/sign_out" component = { Requests } />
                <Route component = { NotFound } />
            </Switch>
        </div>
    )
}

export default App