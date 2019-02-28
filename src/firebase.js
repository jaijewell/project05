import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsClqxbEZ1kmogWnX4Rnmq-oX94H9AZuU",
    authDomain: "projectfive-408eb.firebaseapp.com",
    databaseURL: "https://projectfive-408eb.firebaseio.com",
    projectId: "projectfive-408eb",
    storageBucket: "projectfive-408eb.appspot.com",
    messagingSenderId: "375894847174"
};

firebase.initializeApp(config);

export default firebase;
