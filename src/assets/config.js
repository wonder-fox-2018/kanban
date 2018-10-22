import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDGPgCkRGgAmvxOoLFWMbXFlLuVeKnzUD8",
    authDomain: "kanban-h8.firebaseapp.com",
    databaseURL: "https://kanban-h8.firebaseio.com",
    projectId: "kanban-h8",
    storageBucket: "kanban-h8.appspot.com",
    messagingSenderId: "152460700334"
};
firebase.initializeApp(config);

const database = firebase.database()

export default database