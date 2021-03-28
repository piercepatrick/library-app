
const database = firebase.database();
let i;
let myLibrary;
let key;
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

    firebase.database().ref(`/users/${user.uid}/Books/`).limitToLast(1).once('value').then(function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
         //console.log(childSnapshot.key);
         key = childSnapshot.key;
         key = parseInt(key);
         i = key + 1;
         
     });
    });

/*
    firebase.database().ref(`/users/${user.uid}/Books/`).once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          database.ref(`/users/${user.uid}/Books/` + childSnapshot.key).update({
            index: childSnapshot.key,
          });
          key = childSnapshot.key;
          key = parseInt(key);
          i = key + 1;
          
      });
    });

*/



    

  }).catch((error) => {
    // Handle Errors here.
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    googleSignIn.innerHTML =  'Failed to Sign In';
  })
}