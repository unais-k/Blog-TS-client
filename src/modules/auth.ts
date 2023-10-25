import axios from 'axios';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth';
import IUser from '../interfaces/user';
import config from '../config/config';
import logging from '../config/loggings';

const NAMESPACE = 'Auth';

export const SignInWithSocialMedia = async (provider: GoogleAuthProvider): Promise<UserCredential> => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        throw error;
    }
};

export const Authenticate = async (uid: string, name: string, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        let response = await axios({
            method: 'POST',
            url: `${config.server.url}/users/login`,
            data: {
                uid,
                name
            },
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 201 || response.status === 304) {
            logging.info('Successfully authenticated.', NAMESPACE);
            callback(null, response.data.user);
        } else {
            logging.warn('Unable to authenticate.', NAMESPACE);
            callback('Unable to authenticate.', null);
        }
    } catch (error) {
        logging.error(error, NAMESPACE);
        callback('Unable to authenticate.', null);
    }
};

export const Validate = async (fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        let response = await axios({
            method: 'GET',
            url: `${config.server.url}/users/validate`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            logging.info('Successfully validated.', NAMESPACE);
            callback(null, response.data.user);
        } else {
            logging.warn(response, NAMESPACE);
            callback('Unable to validate.', null);
        }
    } catch (error) {
        logging.error(error, NAMESPACE);
        callback('Unable to validate.', null);
    }
};
