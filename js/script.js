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
  responseSuccess("add");
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
  const textTitle = document.createElement('h4');
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
  container.setAttribute('class', 'mb-2 border p-2 bg-white rounded-md md:p-4 lg:p-6');
  container.append(textContainer);
  container.setAttribute('id', `book-${bookObject.id}`);

  if (bookObject.isComplete) {
    const unreadButton = document.createElement('button');
    unreadButton.setAttribute(
      'class', 
      'mx-1 text-slate-300 hover:bg-slate-700 hover:text-white font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline');
      unreadButton.innerHTML = `<span class="material-symbols-outlined mt-1">undo</span>`;
    unreadButton.addEventListener('click', function() {
      unreadBook(bookObject.id);
    });

    const editButton = document.createElement('button');
    editButton.setAttribute(
      'class', 
      'mx-1 text-yellow-300 hover:bg-yellow-700 hover:text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline');
    editButton.innerHTML = `<span class="material-symbols-outlined mt-1">edit</span>`;
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    });

    const deleteButton  = document.createElement('button');
    deleteButton.setAttribute(
      'class', 
      'mx-1 text-rose-300 hover:bg-rose-700 hover:text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline');
    deleteButton.innerHTML = `<span class="material-symbols-outlined mt-1">delete</span>`;
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
      'mx-1 text-teal-300 hover:bg-teal-700 hover:text-white font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline');
    hasBeenReadButton.innerHTML = `<span class="material-symbols-outlined mt-1">Done</span>`;
    hasBeenReadButton.addEventListener('click', function() {
      completeBook(bookObject.id);
    });

    const editButton = document.createElement('button');
    editButton.setAttribute(
      'class', 
      'mx-1 text-yellow-300 hover:bg-yellow-700 hover:text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline');
    editButton.innerHTML = `<span class="material-symbols-outlined mt-1">edit</span>`;
    editButton.addEventListener('click', function() {
      editBook(bookObject.id);
    });

    const deleteButton  = document.createElement('button');
    deleteButton.setAttribute(
      'class', 
      'mx-1 text-rose-300 hover:bg-rose-700 hover:text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline');
    deleteButton.innerHTML = `<span class="material-symbols-outlined mt-1">delete</span>`;
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
  responseSuccess("finished");
}

function unreadBook(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  responseSuccess("unfinished");
}

function deleteBook(bookId) {
  showConfirmationDelete()
  const bookTarget = findBookById(bookId);
  const closeConfirmDelete = document.getElementById('close-confirmation-delete');
  const yesResponse = document.getElementById('delete-yes');
  const noResponse = document.getElementById('delete-no');

  if (bookTarget === -1) return;
  
  closeConfirmDelete.addEventListener('click', function() {
    closeConfirmationDelete();
  })

  yesResponse.addEventListener('click', function() {
    books.splice(bookTarget, 1)
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    closeConfirmationDelete();
    responseSuccess("delete");
  })

  noResponse.addEventListener('click', function() {
    closeConfirmationDelete();
  })
  
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
    closeFormEdit();
    responseSuccess('change');
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

function responseSuccess(forResult) {
  showSuccess()
  const messageSuccess = document.getElementById('message-success');
  if (forResult === "add") {
    messageSuccess.innerText = "Book data was successfully added.";
  } else if (forResult === "change") {
    messageSuccess.innerText = "Book data was successfully changed.";
  } else if (forResult === "delete") {
    messageSuccess.innerText = "Book data was successfully deleted.";
  } else if (forResult === "finished") {
    messageSuccess.innerText = "Book data successfully moved to shelf Finished reading.";
  } else if (forResult === "unfinished") {
    messageSuccess.innerText = "Book data successfully moved to shelf Unfinished reading.";
  }

  const closeSuccessResponse = document.getElementById('close-success');
  closeSuccessResponse.addEventListener('click', function() {
    closeSuccess();
  })

  const buttonOke = document.getElementById('success-ok');
  buttonOke.addEventListener('click', function() {
    closeSuccess();
  })
}

function showFormEdit() {
  const constinerForm = document.getElementById('container-form');
  const containerFormEdit = document.getElementById('container-form-edit');

  constinerForm.classList.remove('invisible');
  constinerForm.classList.add('visible');

  containerFormEdit.classList.remove('invisible');
  containerFormEdit.classList.add('visible');
}

function showConfirmationDelete() {
  const containerConfirmationDelete = document.getElementById('container-confirmation-delete');
  const contentConfirmationDelete = document.getElementById('content-confirmation-delete');

  containerConfirmationDelete.classList.remove('invisible');
  containerConfirmationDelete.classList.add('visible');
  
  contentConfirmationDelete.classList.remove('invisible');
  contentConfirmationDelete.classList.add('visible');
}

function showSuccess() {
  const containerSuccess = document.getElementById('container-success');
  const contentSuccess = document.getElementById('content-success');

  containerSuccess.classList.remove('invisible');
  containerSuccess.classList.add('visible');

  contentSuccess.classList.remove('invisible');
  contentSuccess.classList.add('visible');
}

function closeFormEdit() {
  const constinerForm = document.getElementById('container-form');
  const containerFormEdit = document.getElementById('container-form-edit');

  constinerForm.classList.remove('visible');
  constinerForm.classList.add('invisible');

  containerFormEdit.classList.remove('visible');
  containerFormEdit.classList.add('invisible');
}

function closeConfirmationDelete() {
  const containerConfirmationDelete = document.getElementById('container-confirmation-delete');
  const contentConfirmationDelete = document.getElementById('content-confirmation-delete');

  containerConfirmationDelete.classList.remove('visible');
  containerConfirmationDelete.classList.add('invisible');
  
  contentConfirmationDelete.classList.remove('visible');
  contentConfirmationDelete.classList.add('invisible');
}

function closeSuccess() {
  const containerSuccess = document.getElementById('container-success');
  const contentSuccess = document.getElementById('content-success');

  containerSuccess.classList.remove('visible');
  containerSuccess.classList.add('invisible');

  contentSuccess.classList.remove('visible');
  contentSuccess.classList.add('invisible');
}

function searchBook() {
  const searchTitle = document.getElementById('search-title').value.toLowerCase();
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTitle));
  renderBooks(filteredBooks);
  if (filteredBooks.length == 0) {
    showNotFound()
    const btnClose = document.getElementById('close-not-found');
    btnClose.addEventListener('click', function() {
      closeNotFound();
    });

    const btnBack = document.getElementById('btn-back');
    btnBack.addEventListener('click', function() {
      closeNotFound();
    });
}
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

function showNotFound() {
  const containerNotFound = document.getElementById('container-not-found');
  const contentNotFound = document.getElementById('content-not-found');

  containerNotFound.classList.remove('invisible');
  containerNotFound.classList.add('visible');

  contentNotFound.classList.remove('invisible');
  contentNotFound.classList.add('visible');
}

function closeNotFound() {
  const containerNotFound = document.getElementById('container-not-found');
  const contentNotFound = document.getElementById('content-not-found');

  containerNotFound.classList.remove('visible');
  containerNotFound.classList.add('invisible');

  contentNotFound.classList.remove('visible');
  contentNotFound.classList.add('invisible');v
}

function onChangeShelfText() {
  const isComplete = document.getElementById("checkbox-readed").checked;
  const shelf = document.getElementById('shelf');
  shelf.innerText = isComplete ? "Finished reading" : "Unfinished reading";
}