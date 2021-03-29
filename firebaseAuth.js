
// Initialize global variables
const database = firebase.database();
let i;
let myLibrary;
let key;
var provider = new firebase.auth.GoogleAuthProvider();

// Add event listener to "Sign in With Google" button
const googleSignIn = document.querySelector('#googleButton');
googleSignIn.addEventListener("click", signIn);

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    // Change sign in button to signed in
    googleSignIn.innerHTML =  'Signed In ✅';

    // Add each book they already have in the database to myLibrary and display them on the screen when they login
    firebase.database().ref(`/users/${user.uid}/Books/`).on('value', function(snap){

      snap.forEach(function(childNodes){
        myLibrary.push(childNodes.val());
        

        let card = document.createElement('div');
        let title = document.createElement('h1');
        let author = document.createElement('h2');
        let pages = document.createElement('p');
        let isRead = document.createElement('p');
        let readStatusBtn = document.createElement('BUTTON');
        let removeButton = document.createElement('BUTTON');
        
        isRead.className = 'isReadStatus';
        readStatusBtn.className = 'readStatusBtn';
        readStatusBtn.innerText = 'Change Read Status';
        readStatusBtn.setAttribute("data-index", myLibrary[myLibrary.length -1].index);
        removeButton.className = 'removeButton';
        removeButton.innerText = 'Remove Book';
        removeButton.setAttribute("data-index", myLibrary[myLibrary.length -1].index);
        card.classList.add('card');
    
        title.textContent = myLibrary[myLibrary.length -1].title;
        author.textContent = myLibrary[myLibrary.length -1].author;
        pages.textContent = `${myLibrary[myLibrary.length -1].pages} pages`;
        isRead.textContent = myLibrary[myLibrary.length -1].isRead;
    
        card.append(title);
        card.append(author);
        card.append(pages);
        card.append(isRead);
        card.append(removeButton);
        card.append(readStatusBtn);
        card.setAttribute("data-index", myLibrary[myLibrary.length -1].index);
        container.append(card);
      });
      
    });

    // Get the key of the last book in the database so we know where to start when they add a new book
    firebase.database().ref(`/users/${user.uid}/Books/`).limitToLast(1).once('value').then(function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
         key = childSnapshot.key;
         key = parseInt(key);
         i = key + 1;
     });

    });
  }).catch((error) => {
    // Handle Errors here.
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // If sign in fails, display message
    googleSignIn.innerHTML =  'Failed to Sign In ❌';
  })
}