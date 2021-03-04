let myLibrary = ['book1', 'book2'];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks() {
    for (i=0; i< myLibrary.length; i++)
    {
        console.log(myLibrary[i]);
    }
}

let narnia = new Book();
addBookToLibrary(narnia);
displayBooks();