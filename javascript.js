const myLibrary = [];

function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title,author,pages,read) {
  // do add books to library 
  const addBook = new Book(title,author,pages,read);
  myLibrary.push(addBook);
}

//pre-load sample books
addBookToLibrary("moby dick","stan lee","123",true);
addBookToLibrary("atomic habits","james clear","123",false);
addBookToLibrary("3 little pigs","beo wolf","435",false);

 = element.querySelector(selector)




console.log(myLibrary);
