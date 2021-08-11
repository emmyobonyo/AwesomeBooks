import Book from './module/Book.js';

const form = document.querySelector('#book-form');
class Books {
  constructor() {
    this.booksData = null;
    this.book = null;
    this.id = null;
  }

  addBook(title, author) {
    this.book = new Book(title, author);
    const oldData = JSON.parse(localStorage.getItem('booksData'));
    oldData.push(this.book);
    localStorage.setItem('booksData', JSON.stringify(oldData));
  }

  removeBook(id) {
    this.id = id;
    const booksData = JSON.parse(localStorage.getItem('booksData'));
    booksData.splice(booksData.indexOf(this.id), 1);
    localStorage.setItem('booksData', JSON.stringify(booksData));
  }

  renderBooks() {
    if (localStorage.getItem('booksData') !== null) {
      this.booksData = JSON.parse(localStorage.getItem('booksData'));
      this.booksData.forEach((book, id) => {
        const bookContainer = document.createElement('div');
        bookContainer.className = 'bookContainer';
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookInfo = document.createElement('div');
        bookInfo.className = 'bookInfo';
        const remove = document.createElement('button');
        remove.className = 'remove';
        remove.innerText = 'Remove';
        document.querySelector('.list-books').appendChild(bookContainer);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookContainer.appendChild(bookInfo);
        bookContainer.appendChild(remove);
        bookTitle.innerText = book.title;
        bookAuthor.innerText = "by " + book.author;
        remove.addEventListener('click', (event) => {
          this.removeBook(id);
          event.target.parentNode.remove();
        });
      });
    }
  }
}
const booksLibrary = new Books();
booksLibrary.renderBooks();
document.querySelector('.add').addEventListener('click', () => {
  const titleInput = form.elements.title.value;
  const authorInput = form.elements.author.value;
  if (localStorage.getItem('booksData') === null) {
    localStorage.setItem('booksData', JSON.stringify([]));
  }
  booksLibrary.addBook(titleInput, authorInput);
});

var rows = Array.from(document.querySelectorAll('.bookContainer'));
for (var i = 0; i < rows.length; i++) {
  if (i % 2 == 0) {
    rows[i].style.backgroundColor = '#50394D';
    rows[i].style.color = "white"
  } else {
    rows[i].style.backgroundColor = '#85AFC1';
  }
}