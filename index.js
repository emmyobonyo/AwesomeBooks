import Book from './module/Book.js';

const form = document.querySelector('#book-form');
class Books {
  constructor() {
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
}
if (localStorage.getItem('booksData') !== null) {
  const booksData = JSON.parse(localStorage.getItem('booksData'));
  booksData.forEach((book, id) => {
    const bookContainer = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.innerText = 'Remove';
    document.querySelector('.list-books').appendChild(bookContainer);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(remove);
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    remove.addEventListener('click', (event) => {
      const removebook = new Books();
      removebook.removeBook(id);
      event.target.parentNode.remove();
    });
  });
}
document.querySelector('.add').addEventListener('click', () => {
  const titleInput = form.elements.title.value;
  const authorInput = form.elements.author.value;
  if (localStorage.getItem('booksData') === null) {
    localStorage.setItem('booksData', JSON.stringify([]));
  }
  const newbook = new Books();
  newbook.addBook(titleInput, authorInput);
});
Array.from(document.querySelectorAll('.remove')).forEach((remove) => {
  remove.addEventListener('click', (event) => {
    event.target.parentNode.remove();
  });
});