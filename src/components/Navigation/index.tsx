import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarBrand, Nav } from 'reactstrap';

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
    return (
        <Navbar>
            <Container>
                <NavbarBrand tag={Link} to="/">
                    📋
                </NavbarBrand>
                <Nav className="mr-auto" />
            </Container>
        </Navbar>
    );
};

export default Navigation;
