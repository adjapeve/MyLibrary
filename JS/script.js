let myLibrary = "";
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addBookToLibrary);
validateLibraryExistence();

function Book(title, author, numPages, status) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
}
//example of prototype function, not needed for this program
// Book.prototype.info = function () {
//     return `Title: ${this.title},Author: ${this.author},Num of Pages: ${this.numPages},Status: ${this.status}`;
// }
function validateLibraryExistence() {
    if (localStorage.getItem('storageLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem('storageLibrary'));
        showCards();
    } else {
        myLibrary = [];
    }
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let numPages = document.getElementById("numPages").value;
    let status = getBookStatus();
    newBook = new Book(title, author, numPages, status);
    myLibrary.push(newBook);
    localStorage.setItem('storageLibrary', JSON.stringify(myLibrary));
    let clear = Array.from(document.querySelectorAll("input"));
    clear.forEach(element => { if (element.type != "radio") element.value = '' });
    showCards();
}

function getBookStatus() {
    let bookStatus = document.getElementsByName('status');
    for (i = 0; i < bookStatus.length; i++) {
        if (bookStatus[i].checked)
            return bookStatus[i].value;
    }
}

function showCards() {
    let cardsContainer = document.getElementById("cardsContainer");
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }
    generateCards(cardsContainer);
    //create listeners for delete and change status buttons
    const deleteButtons = Array.from(document.querySelectorAll('.deleteBtn'));
    deleteButtons.forEach(button => button.addEventListener('click', deleteBook));
    const statusButtons = Array.from(document.querySelectorAll('.statusBtn'));
    statusButtons.forEach(button => button.addEventListener('click', changeBookStatus));
}
function generateCards(cardsContainer) {
    for (let [index, element] of myLibrary.entries()) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("bookContainer");
        for (key in element) {
            if (key == "title") {
                let text = document.createElement('p');
                text.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ": " + element[key];
                text.classList.add("bookTitle");
                bookCard.appendChild(text);
            } else {
                let text = document.createElement('p');
                text.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ": " + element[key];
                bookCard.appendChild(text);
            }
            if (key == "status") {
                let divButtons = document.createElement('div');
                divButtons.classList.add("bookOptions");
                let statusbtn = document.createElement("button");
                (element.status == "Read") ? statusbtn.textContent = "Not Read" : statusbtn.textContent = "Read";
                statusbtn.setAttribute('data-book', index);
                statusbtn.classList.add('statusBtn');
                divButtons.appendChild(statusbtn);
                let deletebtn = document.createElement("button");
                deletebtn.textContent = "Delete";
                deletebtn.setAttribute('data-book', index);
                deletebtn.classList.add('deleteBtn')
                divButtons.appendChild(deletebtn);
                bookCard.appendChild(divButtons);
            }
        }
        cardsContainer.appendChild(bookCard);
    }
}

function deleteBook(e) {
    let bookIndex = e.target.getAttribute('data-book');
    myLibrary.splice(bookIndex, 1);
    localStorage.setItem('storageLibrary', JSON.stringify(myLibrary));
    showCards();
}

function changeBookStatus(e) {
    let bookIndex = e.target.getAttribute('data-book');
    (e.target.textContent == "Read") ? myLibrary[bookIndex].status = "Read" : myLibrary[bookIndex].status = "Not Read";
    localStorage.setItem('storageLibrary', JSON.stringify(myLibrary));
    showCards();
}