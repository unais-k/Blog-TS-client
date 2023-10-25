import React, { useContext, useState } from 'react';
import IPageProps from './../interfaces/page';
import CenterPiece from '../components/CenterPiece';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import LoadingComponent from '../components/LoadingComponent';
import ErrorText from '../components/ErrorText';
import { Authenticate, SignInWithSocialMedia as signInWithPopup } from '../modules/auth';
import { Providers } from '../config/firebase';
import logging from '../config/loggings';
import { GoogleAuthProvider } from 'firebase/auth';

import UserContext from '../contexts/user';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FunctionComponent<IPageProps> = (props) => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const isLogin = window.location.pathname.includes('login');

    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const signInWithSocialMedia = (provider: GoogleAuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);

        signInWithPopup(provider)
            .then(async (result) => {
                logging.info(result);

                let user = result.user;

                if (user) {
                    let uid = user.uid;
                    let name = user.displayName;

                    if (name) {
                        try {
                            let fire_token = await user.getIdToken();

                            Authenticate(uid, name, fire_token, (error, _user) => {
                                if (error) {
                                    setError(error);
                                    setAuthenticating(false);
                                } else if (_user) {
                                    userContext.userDispatch({ type: 'login', payload: { user: _user, fire_token } });
                                    navigate('/');
                                }
                            });
                        } catch (error) {
                            setError('Invalid token.');
                            logging.error(error);
                            setAuthenticating(false);
                        }
                    } else {
                        setError('The identify provider is missing a display name.');
                        setAuthenticating(false);
                    }
                } else {
                    setError('The social media provider does not have enough information. Please try a different provider.');
                    setAuthenticating(false);
                }
            })
            .catch((error) => {
                logging.error(error);
                setAuthenticating(false);
                setError(error.message);
            });
    };
    return (
        <CenterPiece>
            <Card>
                <CardHeader>{isLogin ? 'Login' : 'Sign Up'}</CardHeader>
                <CardBody>
                    <ErrorText error={error} />
                    <Button block disabled={authenticating} onClick={() => signInWithSocialMedia(Providers.google)} style={{ backgroundColor: '#ea4335', borderColor: '#ea4335' }}>
                        <i className="fab fa-google mr-2"></i> Sign {isLogin ? 'in' : 'up'} with Google
                    </Button>
                    {authenticating && <LoadingComponent card={false} />}
                </CardBody>
            </Card>
        </CenterPiece>
    );
};

export default LoginPage;
