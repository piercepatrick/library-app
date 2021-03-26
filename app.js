
// Get a reference to the database service
const database = firebase.database();


let i = 0;

const container = document.querySelector('.container');

document.getElementById('form').addEventListener('submit', addBook);
document.getElementById('resetBooks').addEventListener('click', resetCards);
container.addEventListener("click", changeBook);


let myLibrary = [];

function getBookFromInput(book) {
  let title = document.getElementById('formTitle').value;
  let author = document.getElementById('formAuthor').value;
  let pages = document.getElementById('formPages').value;
  let isRead = document.querySelector('input[name="formRead"]:checked').value;
  if (firebase.auth().currentUser) {
    let user = firebase.auth().currentUser;
    database.ref(`/users/${user.uid}/Books/` + i).set({
      title: title,
      author: author,
      pages: pages,
      isRead: isRead
    });
    i = i + 1;
  }
  
  return new Book(title, author, pages, isRead);
}


function addBook(book) {
  let newBook = getBookFromInput(book);
  addBookToLibrary(newBook);
  displayBooks()
  closeForm();
  book.preventDefault();
  document.getElementById("form").reset();
}

function resetCards() {
  while(container.firstChild) {
    container.removeChild(container.lastChild);
  }
  myLibrary = [];
}

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
    let cardToChange = document.querySelector(`[data-index="${index}"]`);
    let readStatus = cardToChange.querySelector('.isReadStatus');

    
    if (readStatus.innerHTML === "Read") {
      readStatus.innerHTML = "Not Read";
      myLibrary[index].isRead = "Not Read";
      if (firebase.auth().currentUser) {
        let user = firebase.auth().currentUser;
        database.ref(`/users/${user.uid}/Books/` + index).update({
          isRead: "Not Read"
        });
    }
  }
    else {
      readStatus.innerHTML = "Read";
      myLibrary[index].isRead = "Read";
      if (firebase.auth().currentUser) {
        let user = firebase.auth().currentUser;
        database.ref(`/users/${user.uid}/Books/` + index).update({
          isRead: "Read"
        });
        }
  
     }
    }
 }

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

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks() {
    makeCard(myLibrary[myLibrary.length -1]);
}

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

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


// to do:

// save data between sessions: let i = 0 needs to be reworked to where it equals the
// the next book index
// myLibrary array needs to be saved


// database functionality to reset library button
// remove book from database when remove book button is hit
// have book data saved for every login.
// make icon on page to show they are signed in
// change isRead to true / false 
// 
// add close form button to popup