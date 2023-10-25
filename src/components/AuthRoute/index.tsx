import React, { useContext } from 'react';
import logging from '../../config/loggings';
import UserContext from '../../contexts/user';
import { Link } from 'react-router-dom';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;

    const userContext = useContext(UserContext);

    if (userContext.userState.user._id === '') {
        logging.info('Unauthorized, redirecting.');
        return <Link to="/login" />;
    } else {
        return <React.Fragment>{children}</React.Fragment>;
    }
};

export default AuthRoute;
