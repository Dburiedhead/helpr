import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { PlusSquare, Home } from 'react-feather';

class UserMenu extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="light" variant="light">
                    <Link as={Navbar.Brand} to="/">Helpr</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                        {/* <LinkContainer exact to="/">
                            <NavItem>Home</NavItem>
                        </LinkContainer> */}
                            {/* <Link as={Nav.Link} href="/"><Home /></Link> */}
                            <Link as={Nav.Link} to="/requests">Requests</Link>
                            <Link as={Nav.Link} to="/dashboard">Dashboard</Link>
                            <Link as={Nav.Link} to="/chat">Messages</Link>
                            <Link as={Nav.Link} to="/test">Test</Link>
                            {/* <Link as={Nav.Link} to="#">condition, si user pas connecté, afficher Home, Connexion, Requests. Sinon Chat, New request, Dashboard(à la place de home), Profile et déco</Nav.Link> */}
                            <Link as={Nav.Link} to="/newrequest"><Button><PlusSquare/>New Request</Button></Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="justify-content-end">
                        <NavDropdown title="User Name" id="nav-dropdown">
                            <NavDropdown.Item eventKey="1" ref="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="2" to="/users/sign_out">Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default UserMenu;