import React from 'react';
import IPageProps from './../interfaces/page';
import { Container } from 'reactstrap';
import Navigation from '../components/Navigation';
import Header from '../components/Header';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header headline="Check out what people have to say" title="A Nerdy Blog Website" />
            <Container className="mt-5">super Blog</Container>
        </Container>
    );
};

export default HomePage;
