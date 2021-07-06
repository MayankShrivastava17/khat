// firebase configuration 
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDIrbta5muvOPQwJW1pGiIJL4Wy5yNAFs4",
    authDomain: "mail-box-51a4a.firebaseapp.com",
    databaseURL: "https://mail-box-51a4a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mail-box-51a4a",
    storageBucket: "mail-box-51a4a.appspot.com",
    messagingSenderId: "29289685516",
    appId: "1:29289685516:web:932f6bfcb86b5bdb4bc429",
    measurementId: "G-0XTH145H1D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// get the elements

// buttons 
// get the loging button 
const login = document.getElementById("enterDetails");
// get the signup button 
const signup = document.getElementById("submitDetails");
// get the signout button 
// const signout = document.getElementById("");

// get the details 
// get the email 
const email = document.getElementById("email");
// get the name 
const name = document.getElementById("name");
// get the password 
const password = document.getElementById("password");
// get the username 
const username = document.getElementById("username");
// get the phone 
const phone = document.getElementById("phone");

// creating login function 
signup.addEventListener('click', e => {
    const e = email.value;
    const n = name.value;
    const p = password.value;
    const u = username.value;
    const p = phone.value;

    const auth = firebase.auth();

    // create in with firebase 
    const promise = auth.createUserWithEmailAndPassword(e, p).then(user => {
        console.log("User create successful");
    }).catch( err => {
        alert(err.message);
        console.log(err.message);
    });
});

// creating login function 
login.addEventListener('click', e => {
    const e = email.value;
    const p = password.value;

    const auth = firebase.auth();

    // signin in firebase 
    auth.signInWithEmailAndPassword(e, p).then(user => {
        // if the user detail is correct 
        window.location = ('after-login.html');
    }).catch(err => {
        // if user detail is not correct 
        console.log(err.message);
        alert(err.message);
    })
})

// creating signout funtion 
// signout.addEventListener('click', e => {
//     window.location = ('/');
// });