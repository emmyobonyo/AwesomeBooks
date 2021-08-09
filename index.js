// const author = document.getElementById('author-input');
const form = document.querySelector("#book-form");
if (localStorage.getItem("booksData") !== null) {
  var booksData = JSON.parse(localStorage.getItem("booksData"));
  booksData.map((book) => {
    const bookContainer = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const remove = document.createElement("button");
    remove.className = "remove";
    remove.innerText = "Remove";
    document.querySelector(".list-books").appendChild(bookContainer);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(remove);
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;

    remove.addEventListener("click", (event) => {
      booksData.splice(booksData.indexOf(book), 1);
      localStorage.setItem("booksData", JSON.stringify(booksData));
      var x = event.target.parentNode.remove();
    });
  });
}
document.querySelector(".add").addEventListener("click", (event) => {
  const titleInput = form.elements.title.value;
  const authorInput = form.elements.author.value;

  let newbook = new Book(titleInput, authorInput);

  if (localStorage.getItem("booksData") === null) {
    localStorage.setItem("booksData", JSON.stringify([]));
  }
  var oldData = JSON.parse(localStorage.getItem("booksData"));
  oldData.push(newbook);
  localStorage.setItem("booksData", JSON.stringify(oldData));
});
