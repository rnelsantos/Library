myBooks = [];  // for book objects storage



//Declared functions----
function Book(title,author,pages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookTomyBooks(title,author,pages,read) {
  // do add books to library 
  const addBook = new Book(title,author,pages,read);
  myBooks.push(addBook);
}

//pre-load sample books
function loadSampleBooks() {
addBookTomyBooks("moby dick","stan lee","123",true);
addBookTomyBooks("atomic habits","james clear","123",false);
addBookTomyBooks("3 little pigs","beo wolf","435",false);
}


function displayBook(key, value){
//Display myBook stored items
const booksGrid = document.querySelector(".books-grid");
//Create bookCard Elements
const bookCard = document.createElement('div')
const cardTitle = document.createElement('p')
const cardAuthor= document.createElement('p')
const cardPages= document.createElement('p')
const cardBtnDiv = document.createElement('div')
const cardRead = document.createElement('button')
const cardDelete = document.createElement('button')


//append respective bookCard Childrens
bookCard.appendChild(cardTitle);
bookCard.appendChild(cardAuthor);
bookCard.appendChild(cardPages);
bookCard.appendChild(cardBtnDiv);
cardBtnDiv.appendChild(cardRead);
cardBtnDiv.appendChild(cardDelete);
//input myBook info txt
cardTitle.innerText = key.title;
cardAuthor.innerText = key.author;
cardPages.innerText = key.pages;
cardRead.innerText = "Read";
cardDelete.innerText = "Delete"
//functions upon click
cardRead.onclick =deleteBook
cardDelete.onclick = deleteBook

//add bookCard classlists
bookCard.classList.add('book-card');
cardBtnDiv.classList.add('card-btns');
cardRead.classList.add('btn');
cardDelete.classList.add('btn');
cardRead.classList.add('btn-read');
cardDelete.classList.add('btn-del');
cardDelete.setAttribute("id", "delBtn");
cardRead.setAttribute("id", "readBtn");

//Add to existing Html DOM
booksGrid.appendChild(bookCard);
}

//Reset Book Display
  function resetDisplayBooks(){
  const booksGrid = document.querySelector(".books-grid");
  while (booksGrid.firstChild) {
  booksGrid.removeChild(booksGrid.firstChild);
  }
}

// Close Modal When Clicked on Modal:Background / Cancel Button
const cancelButton = document.querySelector("#cancelBtn")
const dialog = document.querySelector("dialog")
dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})

cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
})

//Open Add Form on Modal 
const addButton = document.querySelector("#addBookBtn")
  addButton.addEventListener('click', () => {
  dialog.showModal();
  })

//add Book to myBooks Array  upon submit
const submitButton = document.querySelector("#submitBtn")
submitButton.addEventListener('click', () => {
  //e.preventDefault(); // spent hours (alternative put html form method dialog)
  addNewBook();  
  dialog.close();
})
//add book function
function addNewBook(){
  newTitle = document.querySelector("#title").value;
  newAuthor = document.querySelector("#author").value;
  newPages = document.querySelector("#pages").value;
 addBookTomyBooks(newTitle,newAuthor,newPages,false);
 resetDisplayBooks();
 myBooks.forEach(displayBook);
  //resetFrom
  var form = document.querySelector("form");
  form.reset();
}

//delete book function
function deleteBook(e){
  const deleteButton = document.querySelector(".btn-del")
    const title = e.target.parentNode.parentNode.firstChild.innerText;
    console.log(title);
    const newBooks = myBooks.filter((item)=> {return item.title!=title});
   myBooks = newBooks;
   resetDisplayBooks();
   myBooks.forEach(displayBook);
}

loadSampleBooks();
myBooks.forEach(displayBook);








//loadSampleBooks();
//myBooks.forEach(displayBook);
console.log(myBooks);

