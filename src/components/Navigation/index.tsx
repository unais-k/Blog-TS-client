import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarBrand, Nav, Button, NavbarText } from 'reactstrap';
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext.userState;

    const logout = () => {
        userContext.userDispatch({ type: 'logout', payload: initialUserState });
    };
    return (
        <Navbar>
            <Container>
                <NavbarBrand tag={Link} to="/">
                    📝
                </NavbarBrand>
                <Nav className="mr-auto" navbar></Nav>
                {user._id !== '' ? (
                    <div>
                        <Button outline tag={Link} to="/edit">
                            <i className="far fa-sticky-note mr-2"></i>
                            Post a Blog
                        </Button>
                        <NavbarText className="ml-2 mr-2">|</NavbarText>
                        <Button outline size="sm" onClick={() => logout()}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div>
                        <NavbarText tag={Link} to="/login">
                            Login
                        </NavbarText>
                        <NavbarText className="ml-2 mr-2">|</NavbarText>
                        <NavbarText tag={Link} to="/register">
                            SignUp
                        </NavbarText>
                    </div>
                )}
            </Container>
        </Navbar>
    );
};

export default Navigation;
