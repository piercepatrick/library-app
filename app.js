const container = document.querySelector('.container');

document.getElementById('form').addEventListener('submit', addBook);

let myLibrary = [];

function getBookFromInput(book) {
  let title = document.getElementById('formTitle').value;
  let author = document.getElementById('formAuthor').value;
  let pages = document.getElementById('formPages').value;
  let isRead = document.querySelector('input[name="formRead"]:checked').value;
  return new Book(title, author, pages, isRead);
}



function addBook(book) {
  let newBook = getBookFromInput(book);
  addBookToLibrary(newBook);
  //resetCards();
  displayBooks()
  closeForm();
  book.preventDefault();
  document.getElementById("form").reset();
}

function resetCards() {

}

class Book {
    constructor(
      title = "Unknown",
      author = "Unknown",
      pages = "0",
      isRead = "false"
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
    for (i=0; i< myLibrary.length; i++)
    {
        makeCard();
    }
}

function makeCard()
{
    let card = document.createElement('div');
    let title = document.createElement('h1');
    let author = document.createElement('h2');
    let pages = document.createElement('p');
    let isRead = document.createElement('p')
    card.classList.add('card');
    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
    isRead.textContent = myLibrary[i].isRead;
    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(isRead);
    container.append(card);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
