restoreLocal()


function saveLocal() {
  localStorage.setItem('library', JSON.stringify(myBooks))
}

function restoreLocal() {
  const books = JSON.parse(localStorage.getItem('library'))
  if (books) {
    //myBooks = books.map((book) => JSONToBook(book))
    myBooks = books;
  } else {
    myBooks = [];
  }
}


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
  saveLocal();
}

//pre-load sample books
function loadSampleBooks() {
resetDisplayBooks()
addBookTomyBooks("moby dick","stan lee","123",true);
addBookTomyBooks("atomic habits","james clear","123",false);
addBookTomyBooks("3 little pigs","beo wolf","435",false);
myBooks.forEach(displayBook);
}


function displayNone(){
  resetDisplayBooks()
  const main = document.querySelector(".main-container");
  const sampleButton = document.createElement('button');
  const NoDisplayText = document.createElement('h2')
  const noDisplayContainer = document.createElement('div')
    noDisplayContainer.classList.add('noDisContainer');
    main.appendChild(noDisplayContainer);
    // start text display
    NoDisplayText.innerText = "Press +Add Books to start"
    NoDisplayText.classList.add('noBooks');
    noDisplayContainer.appendChild(NoDisplayText);
    //Sample button
    sampleButton.innerText = "Load Sample Books"
    sampleButton.classList.add('btn-sample');
    noDisplayContainer.appendChild(sampleButton);
    sampleButton.onclick = loadSampleBooks
}

function displayBook(key, value){
  saveLocal();
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
  cardTitle.innerText = "Title:"+" "+" "+ key.title;
  cardAuthor.innerText ="Author:"+" "+" "+ key.author;
  cardPages.innerText ="no. of Pages:"+" "+" "+ key.pages;
  if(key.read===true){state="Done✔️"; cardRead.classList.add('done');}else{state="Ongoing"; cardRead.classList.remove('done');};
  cardRead.innerText = state;
  cardDelete.innerText = "Delete"
  //functions upon click
  cardRead.onclick =toggleRead
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

  //remove addBooks to start Text 
  const noDisplay = document.querySelector(".noDisContainer");
  if(noDisplay){
  while (noDisplay.firstChild) {
    noDisplay.removeChild(noDisplay.firstChild);
  }}
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
  var form = document.querySelector("form").reset();
}

//delete book function
function deleteBook(e){
  const deleteButton = document.querySelector(".btn-del")
  const title = e.target.parentNode.parentNode.firstChild.innerText;
  myBooks= myBooks.filter((item)=> {return item.title!=title});
  resetDisplayBooks(); myBooks.forEach(displayBook);saveLocal();   
}

//toggle read/unread book function
function toggleRead(e){
  const readButton = document.querySelector(".btn-read")
  const title = e.target.parentNode.parentNode.firstChild.innerText;
  myBooks.forEach((book) => {if(book.title===title){book.read = !book.read}})
  console.log(title);

  resetDisplayBooks();
  myBooks.forEach(displayBook);
}




if (myBooks.length === 0) {displayNone()} // display if no books
//loadSampleBooks(); // for debugging
myBooks.forEach(displayBook); // display if there's stored








//loadSampleBooks();
//myBooks.forEach(displayBook);
console.log(myBooks);

