const booksArr = [];
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.addBook = () => {
  booksArr.push({ title: this.title, author: this.author });
};
