const firebase = require('firebase').default;
const admin = require('firebase-admin');

// load in environment variables
require('dotenv').config();

// load in our app's config
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
});

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIV_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.FIREBASE_ADMIN_DATABASE_URL
});

// export the firebase services
module.exports = {
    database: firebase.database(),
    messaging: admin.messaging()
};