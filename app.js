const container = document.querySelector('.container');

let myLibrary = [];

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
let narnia = new Book('narnia', 'author', 25,false);
addBookToLibrary(narnia);
let bible = new Book('bible', 'author', 25,false);
addBookToLibrary(bible);
let testbible = new Book('3', 'author', 25,false);
addBookToLibrary(testbible);
let testbible3 = new Book('4', 'author', 25,false);
addBookToLibrary(testbible3);
displayBooks();