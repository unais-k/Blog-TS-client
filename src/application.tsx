import React, { useState, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router';
import routes from './config/routes';
import { UserContextProvider, initialUserState, userReducer } from './contexts/user';
import LoadingComponent from './components/LoadingComponent';
import { Validate } from './modules/auth';
import logging from './config/loggings';
import AuthRoute from './components/AuthRoute';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [authStage, setAuthStage] = useState<string>('Checking localStorage ...');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            CheckLocalStorageForCredentials();
        }, 1000);
    }, []);

    const CheckLocalStorageForCredentials = () => {
        setAuthStage('Checking credentials ...');

        const fire_token = localStorage.getItem('fire_token');

        if (fire_token === null) {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthStage('No credentials found');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            return Validate(fire_token, (error, user) => {
                if (error) {
                    logging.error(error);
                    setAuthStage('User not validate, logging out ..');
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthStage('User authenticated');
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
        }
    };

    const userContextValues = {
        userState,
        userDispatch
    };

    if (loading) {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Routes>
                {routes.map((route, index) => {
                    // if (route.name) {
                    //     return (
                    //         <AuthRoute key={index}>
                    //             <Route path={route.path} element={<route.component />} />;
                    //         </AuthRoute>
                    //     );
                    // } else {
                    //     return <Route key={index} path={route.path} element={<route.component />} />;
                    // }
                    return <Route key={index} path={route.path} element={<route.component />} />;
                })}
            </Routes>
        </UserContextProvider>
    );
};
export default Application;
