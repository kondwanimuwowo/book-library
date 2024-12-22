// Empty array to store the book objects
let myLibrary = [];

// Book Objet Constructor
function Book(title = "unknown", author = "unknown", pages = 0, year = "unknown", read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.read = read;
}

// Book info method on the prototype
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.year}, ${this.read ? "Read" : "Not read yet"}`;
};

// Sample books data  
const atomicHabits = new Book("Atomic Habits", "James Clear", 320, 2018, false);
const thePowerOfNow = new Book("The Power of Now", "Eckhart Tolle", 236, 1997, true);
const theSevenHabits = new Book("The 7 Habits of Highly Effective People", "Stephen R. Covey", 381, 1989, false);
const howToWinFriends = new Book("How to Win Friends and Influence People", "Dale Carnegie", 288, 1936, true);
const thinkAndGrowRich = new Book("Think and Grow Rich", "Napoleon Hill", 238, 1937, false);
const mindset = new Book("Mindset: The New Psychology of Success", "Carol S. Dweck", 320, 2006, true);
const grit = new Book("Grit: The Power of Passion and Perseverance", "Angela Duckworth", 352, 2016, false);
const theSubtleArt = new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, 2016, true);
const deepWork = new Book("Deep Work", "Cal Newport", 304, 2016, false);
const theFourAgreements = new Book("The Four Agreements", "Don Miguel Ruiz", 160, 1997, true);
  
// Function to add add the book objects to the array
function addBookToLibrary(...books) {
    myLibrary.push(...books);
}

// Call the function to add the books to the library
addBookToLibrary(
  atomicHabits,
  thePowerOfNow,
  theSevenHabits,
  howToWinFriends,
  thinkAndGrowRich,
  mindset,
  grit,
  theSubtleArt,
  deepWork,
  theFourAgreements
);


const tBody = document.querySelector("tbody");

function displayBooks(...books) {
  
  // Clear existing table except the table header
  tBody.innerHTML = `
        <tbody>
        </tbody>
  `;

  myLibrary.forEach(function(book, index) {
    let html =  `<tr>
                  <td>${index + 1}</td>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.pages}</td>
                  <td>${book.year}</td>
                  <td>${book.read ? "Read": "Not read yet"}</td>
                  <td>${book.info()}</td>
                  <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                </tr>`;
    tBody.insertAdjacentHTML("beforeend", html);
  });

  // Logic for handling the remove button
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const indexToRemove = e.target.getAttribute("data-index");
      myLibrary.splice(indexToRemove, 1);  // Remove the book from the array
      displayBooks();  // Re-render the updated library
    });
  });
}

// Call function to display the sample book objects
displayBooks(myLibrary);

// New book additions by users logic
const bt = document.getElementById("bt");
const dialog = document.querySelector("dialog");
const btn = document.querySelector("#btn");
const form = document.getElementById("form")

// Listen for the "click" event on the "Add Book" button and show the dialog
btn.addEventListener("click", () => {
  dialog.showModal()
});

// Listen for the "submit" event
form.addEventListener("submit", (e) => {
  
  // Prevent the default submission of the form
  e.preventDefault();
  
  // Collect the form data
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const year = document.getElementById("year").value;
  const read = document.getElementById("read").checked;
  
  // Create new book object
  const newBook = new Book(title, author, pages, year, read);
  
  // Add the new book object to the library
  myLibrary.push(newBook);
  
  // Update the display
  displayBooks();
  
  // Close the dialog
  dialog.close();
  
  // Reset the form
  form.reset();
});

