import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDuyiXwOr_4S1ibqk4f2LRKWCwRHrwJA3o",
    authDomain: "crwn-db-e4b56.firebaseapp.com",
    projectId: "crwn-db-e4b56",
    storageBucket: "crwn-db-e4b56.appspot.com",
    messagingSenderId: "229449473515",
    appId: "1:229449473515:web:e5a133a2052e24e279cdae"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    //find User form userAuth.uid
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //get only important information for user
    const snapShot = await userRef.get();

    // not have for db user
    //add new data
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();
        try {
            //set => add new user
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;