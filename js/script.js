const books = [];
const RENDER_EVENT = 'render_event';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF';

document.addEventListener('DOMContentLoaded', function() {
  const addForm = document.getElementById('form');
  addForm.addEventListener('submit', function(event) {
    event.preventDefault()
    addBook();
  });

  const searchForm = document.getElementById('form-search');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    searchBook();
  })

  if (isStorageExits()) {
    loadDataFromStorage();
  }
});



function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isReaded = document.getElementById('checkbox-readed').checked;
  

  const generatedId = generateId();
  const isComplete = isReaded;
  const bookObject = generatedBookObject(generatedId, title, author, parseInt(year), isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  clearForm(false);
}

function generateId() {
  return +new Date();
}

function generatedBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}

document.addEventListener(RENDER_EVENT, function() {
  renderBooks(books);
});

function makeBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.setAttribute('class', 'font-semibold text-md text-ellipsis overflow-hidden')
  textTitle.innerText = bookObject.title;

  const textAuthor = document.createElement('p');
  textAuthor.setAttribute('class', 'text-md');
  textAuthor.innerText = bookObject.author;

  const textYear = document.createElement('p');
  textYear.setAttribute('class', 'text-md');
  textYear.innerText = bookObject.year;

  const textContainer = document.createElement('div');
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement('section');
  container.setAttribute('class', 'mb-2 border p-2 rounded-md md:p-4 lg:p-6');
  container.append(textContainer);
  container.setAttribute('id', `book-${bookObject.id}`);

  if (bookObject.isComplete) {
    const unreadButton = document.createElement('button');
    unreadButton.innerText = 'unread';
    unreadButton.setAttribute(
      'class', 
      'mx-1 bg-slate-300 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    unreadButton.addEventListener('click', function() {
      unreadBook(bookObject.id);
    });

    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.setAttribute(
      'class', 
      'mx-1 bg-yellow-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.setAttribute(
      'class', 
      'mx-1 bg-rose-300 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    deleteButton.addEventListener('click', function() {
      deleteBook(bookObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'flex justify-end mt-4');
    buttonContainer.append(unreadButton, editButton, deleteButton);

    container.append(buttonContainer);
  } else {
    const hasBeenReadButton = document.createElement('button');
    hasBeenReadButton.setAttribute(
      'class', 
      'mx-1 bg-teal-300 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    hasBeenReadButton.innerText = "complete"
    hasBeenReadButton.addEventListener('click', function() {
      completeBook(bookObject.id);
    });

    const editButton = document.createElement('button');
    editButton.setAttribute(
      'class', 
      'mx-1 bg-yellow-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    });

    const deleteButton  = document.createElement('button');
    deleteButton.setAttribute(
      'class', 
      'mx-1 bg-rose-300 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', function() {
      deleteBook(bookObject.id);
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'flex justify-end mt-4');
    buttonContainer.append(hasBeenReadButton, editButton, deleteButton);

    container.append(buttonContainer);
  }

  return container;
}

function completeBook(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function unreadBook(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function deleteBook(bookId) {
  const bookTarget = findBookById(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1)
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function editBook(bookId) {
  showFormEdit();
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;
  
  const title = document.getElementById('title-edit');
  const author = document.getElementById('author-edit');
  const year = document.getElementById('year-edit');
  const isComplete = document.getElementById('checkbox-readed-edit');

  title.value = bookTarget.title;
  author.value = bookTarget.author;
  year.value = bookTarget.year;
  isComplete.checked = bookTarget.isComplete;

  const editForm = document.getElementById('form-edit');
  editForm.addEventListener('submit', function(event) {
    event.preventDefault();
    bookTarget.title = title.value;
    bookTarget.author = author.value;
    bookTarget.year = parseInt(year.value);
    bookTarget.isComplete = isComplete.checked;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    clearForm(true);
    closeFormEdit()
  })

  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener('click', function() {
    closeFormEdit();
  })
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookById(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function saveData() {
  if (isStorageExits()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExits() {
  if (typeof (Storage) === undefined) {
    alert('Your browser not support local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function() {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function clearForm(isEdit) {
  if (isEdit) {
    document.getElementById('title-edit').value = '';
    document.getElementById('author-edit').value = '';
    document.getElementById('year-edit').value = '';
    document.getElementById('checkbox-readed-edit').checked = false;
  } else {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('checkbox-readed').checked = false;
  }
}

function showFormEdit() {
  const constinerForm = document.getElementById('container-form');
  const containerFormEdit = document.getElementById('container-form-edit');

  constinerForm.classList.remove('invisible');
  constinerForm.classList.add('visible');

  containerFormEdit.classList.remove('invisible');
  containerFormEdit.classList.add('visible');
}

function closeFormEdit() {
  const constinerForm = document.getElementById('container-form');
  const containerFormEdit = document.getElementById('container-form-edit');

  constinerForm.classList.remove('visible');
  constinerForm.classList.add('invisible');

  containerFormEdit.classList.remove('visible');
  containerFormEdit.classList.add('invisible');
}

function searchBook() {
  const searchTitle = document.getElementById('search-title').value.toLowerCase();
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTitle));
  renderBooks(filteredBooks);
}

function renderBooks(books) {
  const unread = document.getElementById('unread');
  unread.innerHTML = '';

  const hasBeenRead = document.getElementById('has-been-read');
  hasBeenRead.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      unread.append(bookElement);
    } else {
      hasBeenRead.append(bookElement);
    }
  }
}

function onChangeShelfText() {
  const isComplete = document.getElementById("checkbox-readed").checked;
  const shelf = document.getElementById('shelf');
  shelf.innerText = isComplete ? "Finished reading" : "Unfinished reading";
}