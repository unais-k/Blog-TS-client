import React, { useEffect, useState } from 'react';
import IPageProps from './../interfaces/page';
import { Container } from 'reactstrap';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import IBlog from '../interfaces/blog';
import config from '../config/config';
import axios from 'axios';
import LoadingComponent from '../components/LoadingComponent';
import logging from '../config/loggings';
import { Link } from 'react-router-dom';
import ErrorText from '../components/ErrorText';
import IUser from '../interfaces/user';
import BlogPreview from '../components/BlogPreview';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/blogs`
            });

            if (response.status === (200 || 304)) {
                let blogs = response.data.blogs as IBlog[];
                blogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

                setBlogs(blogs);
            } else {
                setError('Unable to retrieve blogs');
            }
        } catch (error: any) {
            logging.error(error);
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    if (loading) {
        return <LoadingComponent>Loading blogs...</LoadingComponent>;
    }
    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header headline="Check out what people have to say" title="A Nerdy Blog Website" />
            <Container className="mt-5">
                {blogs.length === 0 && (
                    <p>
                        There are no blogs yet. You should <Link to="/edit">post</Link> one 😊.
                    </p>
                )}
                {blogs.map((blog, index) => {
                    return (
                        <div key={index}>
                            <BlogPreview _id={blog._id} author={(blog.author as IUser).name} headline={blog.headline} title={blog.title} createdAt={blog.createdAt} updatedAt={blog.updatedAt} />
                            <hr />
                        </div>
                    );
                })}
                <ErrorText error={error} />
            </Container>
        </Container>
    );
};

export default HomePage;
