import { Container, Nav, Navbar } from "react-bootstrap";
import User from "../models/user";
import TopBarNoUser from "./TopBarNoUser";
import TopBarUser from "./TopBarUser";
import { Link } from "react-router-dom";
import logo from "../assets/raesulg.png";

interface TopBarProps {
    currUser: User | null,
    onRegisterClick: () => void,
    onLoginClick: () => void,
    onLogoutSuccess: () => void,
}

const TopBar = ({ currUser, onRegisterClick, onLoginClick, onLogoutSuccess }
    : TopBarProps) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="sm">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                    alt="logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"/>
                    Raesu
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { currUser
                            ? <TopBarUser
                            user={currUser}
                            onLogoutSuccess={onLogoutSuccess} />
                            : <TopBarNoUser
                            onSignUpClick={onRegisterClick}
                            onLoginClick={onLoginClick} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopBar;
