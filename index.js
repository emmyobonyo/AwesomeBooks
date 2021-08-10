const form = document.querySelector('#book-form');
class Book{
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
class Books {
  constructor(){
    this.book=null;
  }
  addBook(title,author) {
    this.book = new Book(title,author);
    let oldData = JSON.parse(localStorage.getItem('booksData'));
    oldData.push(this.book);
    localStorage.setItem('booksData', JSON.stringify(oldData));
  }
}
if (localStorage.getItem('booksData') !== null) {
  const booksData = JSON.parse(localStorage.getItem('booksData'));
  booksData.forEach((book) => {
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
      booksData.splice(booksData.indexOf(book), 1);
      localStorage.setItem('booksData', JSON.stringify(booksData));
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
  var newbook = new Books();
  newbook.addBook(titleInput,authorInput);
});
