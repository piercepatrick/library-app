
var provider = new firebase.auth.GoogleAuthProvider();

const googleSignIn = document.querySelector('#googleButton');
googleSignIn.addEventListener("click", signIn);

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    console.log(result)
    console.log('Success Google Account Linked')
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    googleSignIn.innerHTML =  'Signed In ✅';
    // ...
  }).catch((error) => {
    // Handle Errors here.
    console.log(error)
    console.log('Failed to do')
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}