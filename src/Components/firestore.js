import firebase from "firebase";



export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName} = user;
        try {
            await userRef.set({
                displayName,
                email,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();