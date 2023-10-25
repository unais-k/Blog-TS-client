const config = {
    firebase: {
        apiKey: process.env.REACT_APP_GOOGLE_AUTH_APIKEY,
        authDomain: process.env.REACT_APP_GOOGLE_AUTH_AUTHDOMAIN,
        projectId: process.env.REACT_APP_GOOGLE_PROJECTID,
        storageBucket: process.env.REACT_APP_GOOGLE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGESENDERID,
        appId: process.env.REACT_APP_GOOGLE_APPID,
        measurementId: process.env.REACT_APP_GOOGLE_MEASUREMENT_ID
    },
    server: {
        url: 'http://localhost:4002'
    }
};
export default config;
