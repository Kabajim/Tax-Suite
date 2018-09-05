import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD9vh4PRA4l0alJjo9CgEMLqiwWx-5llxw",
    authDomain: "tax-suite.firebaseapp.com",
    databaseURL: "https://tax-suite.firebaseio.com",
    projectId: "tax-suite",
    storageBucket: "tax-suite.appspot.com",
    messagingSenderId: "278832369674"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };