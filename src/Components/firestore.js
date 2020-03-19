import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyClDTry2dq-fekNXt6FnsS0z012GIoyDks",
    authDomain: "tournamentorganizer-14518.firebaseapp.com",
    databaseURL: "https://tournamentorganizer-14518.firebaseio.com",
    projectId: "tournamentorganizer-14518",
    storageBucket: "tournamentorganizer-14518.appspot.com",
    messagingSenderId: "140047855031",
    appId: "1:140047855031:web:20b2fa564a772f5acc0c32"
};

firebase.initializeApp(firebaseConfig);
export default firebase;