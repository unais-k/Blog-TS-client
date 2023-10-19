import firebase from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import config from '../config/config';

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new GoogleAuthProvider()
};

export const auth = getAuth(Firebase);
export default { auth, Providers };
