import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import config from '../config/config';

const Firebase = initializeApp(config.firebase);

export const Providers = {
    google: new GoogleAuthProvider()
};

export const auth = getAuth(Firebase);
export default { auth, Providers };
