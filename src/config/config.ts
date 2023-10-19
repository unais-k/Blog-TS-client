const config = {
    firebase: {
        apiKey: process.env.GOOGLE_AUTH_APIKEY,
        authDomain: process.env.GOOGLE_AUTH_AUTHDOMAIN,
        projectId: process.env.GOOGLE_PROJECTID,
        storageBucket: process.env.GOOGLE_STORAGEBUCKET,
        messagingSenderId: process.env.GOOGLE_MESSAGESENDERID,
        appId: process.env.GOOGLE_APPID
    },
    server: {
        url: 'http://localhost:4002'
    }
};
export default config;
