import Book from './module/Book.js';
import {
  DateTime,
} from './luxon.min.js';

const dates = document.getElementById('date');
const list = document.querySelector('.list');
const add = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const lists = () => {
  document.querySelector('.add-section').classList.remove('visible');
  document.querySelector('.contact-section').classList.remove('visible');
  document.querySelector('.books').classList.remove('invisible');
};
const adds = () => {
  document.querySelector('.add-section').classList.add('visible');
  document.querySelector('.books').classList.add('invisible');
  document.querySelector('.contact-section').classList.remove('visible');
};
const contacts = () => {
  document.querySelector('.contact-section').classList.add('visible');
  document.querySelector('.books').classList.add('invisible');
  document.querySelector('.add-section').classList.remove('visible');
};
const action = (act, str) => {
  act.addEventListener('click', () => {
    switch (str) {
      case 'list':
        lists();
        break;
      case 'add':
        adds();
        break;
      case 'contact':
        contacts();
        break;
      default:
        break;
    }
  });
};

const date = DateTime.fromISO('2010-10-22T21:38:00');
const humanRead = date.toLocaleString(DateTime.DATETIME_MED);
dates.innerHTML = humanRead;

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
        bookAuthor.innerText = `by ${book.author}`;
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

const rows = Array.from(document.querySelectorAll('.bookContainer'));
for (let i = 0; i < rows.length; i += 1) {
  if (i % 2 === 0) {
    rows[i].style.backgroundColor = '#50394d';
    rows[i].style.color = 'white';
  } else {
    rows[i].style.backgroundColor = '#85AFC1';
  }
}

action(list, 'list');
action(add, 'add');
action(contact, 'contact');