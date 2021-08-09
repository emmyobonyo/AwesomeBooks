function Book(title, author) {
  this.title = title;
  this.author = author;
}
var booksArr = [];

Book.prototype.addBook = function () {
  console.log(this.title, this.author);
  booksArr.push({ title: this.title, author: this.author });
};
