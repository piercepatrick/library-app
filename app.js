// If user hasnt signed in initialize myLibrary and i.
if (!firebase.auth().currentUser) {
  i = 0;
  myLibrary = [];
}

// Save variable referencing elements
const container = document.querySelector('.container');
let cancelButton = document.getElementById('formCancel');

// Add event listeners to buttons and site.
document.getElementById('form').addEventListener('submit', addBook);
document.getElementById('resetBooks').addEventListener('click', resetCards);
container.addEventListener("click", changeBook);
cancelButton.addEventListener('click', function() {
  closeForm();
});

// Initialize class book
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = "Not Read",
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// When form is submitted, add the book to the page.
function addBook(book) {
  let newBook = getBookFromInput(book);
  addBookToLibrary(newBook);
  displayBooks()
  closeForm();
  book.preventDefault();
  document.getElementById("form").reset();
}

// Get the values from the form. Save to database if they are logged in.
function getBookFromInput(book) {
  let title = document.getElementById('formTitle').value;
  let author = document.getElementById('formAuthor').value;
  let pages = document.getElementById('formPages').value;
  let isRead = document.querySelector('input[name="formRead"]:checked').value;
  if (firebase.auth().currentUser) {
    let user = firebase.auth().currentUser;
    database.ref(`/users/${user.uid}/Books/` + i).set({
      index: i,
      title: title,
      author: author,
      pages: pages,
      isRead: isRead
    });
    i = i + 1;
  }
  return new Book(title, author, pages, isRead);
}

// Add book object to myLibrary array
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

// Call the makecard function for the book submitted in the form
function displayBooks() {
  makeCard(myLibrary[myLibrary.length -1]);
}

// Displays the book card on the screen
function makeCard(bookToAdd)
{
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
    readStatusBtn.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    removeButton.className = 'removeButton';
    removeButton.innerText = 'Remove Book';
    removeButton.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    card.classList.add('card');

    title.textContent = bookToAdd.title;
    author.textContent = bookToAdd.author;
    pages.textContent = `${bookToAdd.pages} pages`;
    isRead.textContent = bookToAdd.isRead;

    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(isRead);
    card.append(removeButton);
    card.append(readStatusBtn);
    card.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    container.append(card);
}

// When Reset Library button is clicked, remove all cards from screen, clear database for that user
function resetCards() {
  while(container.firstChild) {
    container.removeChild(container.lastChild);
  }
  myLibrary = [];
  if (firebase.auth().currentUser) {
    let user = firebase.auth().currentUser;
    database.ref(`/users/${user.uid}`).remove();
  }
}

// Event listener for remove book button on each card, change read status.
function changeBook(e) {
  if (e.target.classList.contains("removeButton")) {
    let index = e.target.getAttribute('data-index');
    let cardToRemove = document.querySelector(`[data-index="${index}"]`);
    container.removeChild(cardToRemove);
    myLibrary.splice(index,1);
    if (firebase.auth().currentUser) {
      let user = firebase.auth().currentUser;
      database.ref(`/users/${user.uid}/Books/` + index).remove();
    }
  }
  else if (e.target.classList.contains("readStatusBtn")) {
    let index = e.target.getAttribute('data-index');
    console.log(index);
    let cardToChange = document.querySelector(`[data-index="${index}"]`);
    let readStatus = cardToChange.querySelector('.isReadStatus');

    
    if (readStatus.innerHTML === "Read") {
      readStatus.innerHTML = "Not Read";
      for (let b=0; myLibrary.length; b++) {
        if (myLibrary[b].index = index) {
          myLibrary[b].isRead = 'Not Read';
        }
      }
      if (firebase.auth().currentUser) {
        let user = firebase.auth().currentUser;
        database.ref(`/users/${user.uid}/Books/` + index).update({
          isRead: "Not Read"
        });
    }
  }
    else {
      readStatus.innerHTML = "Read";
      for (let b=0; myLibrary.length; b++) {
        if (myLibrary[b].index = index) {
          myLibrary[b].isRead = 'Read';
        }
      }
      if (firebase.auth().currentUser) {
        let user = firebase.auth().currentUser;
        database.ref(`/users/${user.uid}/Books/` + index).update({
          isRead: "Read"
        });
        }
  
     }
    }
 }

// Event listeners for displaying and closing the pop up form.
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}