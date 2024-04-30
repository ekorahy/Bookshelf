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

  if (isStorageExits()) {
    loadDataFromStorage();
  }
});

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;

  const generatedId = generateId();
  const bookObject = generatedBookObject(generatedId, title, author, parseInt(year), false);
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
});

function makeBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = bookObject.author;

  const textYear = document.createElement('p');
  textYear.innerText = bookObject.year;

  const textContainer = document.createElement('div');
  textContainer.append(textTitle, textAuthor, textYear)

  const container = document.createElement('section');
  container.append(textContainer);
  container.setAttribute('id', `book-${bookObject.id}`);

  if (bookObject.isComplete) {
    const unreadButton = document.createElement('button');
    unreadButton.innerText = 'unread';
    unreadButton.addEventListener('click', function() {
      unreadBook(bookObject.id);
    })

    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    })

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', function() {
      deleteBook(bookObject.id);
    })

    container.append(unreadButton, editButton, deleteButton);
  } else {
    const hasBeenReadButton = document.createElement('button');
    hasBeenReadButton.innerText = "complete"
    hasBeenReadButton.addEventListener('click', function() {
      completeBook(bookObject.id);
    })

    const editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    })

    const deleteButton  = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', function() {
      deleteBook(bookObject.id)
    })

    container.append(hasBeenReadButton, editButton, deleteButton);
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
  document.dispatchEvent(new Event(RENDER_EVENT))
  saveData();
}

function deleteBook(bookId) {
  const bookTarget = findBookById(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1)
  document.dispatchEvent(new Event(RENDER_EVENT))
  saveData();
}

function editBook(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;
  
  const title = document.getElementById('title-edit');
  const author = document.getElementById('author-edit');
  const year = document.getElementById('year-edit');

  title.value = bookTarget.title;
  author.value = bookTarget.author;
  year.value = bookTarget.year;

  const editForm = document.getElementById('form-edit');
  editForm.addEventListener('submit', function(event) {
    event.preventDefault()
    bookTarget.title = title.value;
    bookTarget.author = author.value;
    bookTarget.year = parseInt(year.value)
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData();
    clearForm(true);
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
  return true
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
  } else {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
  }
}