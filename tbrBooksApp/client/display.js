const listsWrapper = document.querySelector(".lists__wrapper");
const select = document.querySelector(".select");
const saveForm = document.querySelector(".save");
const bookTitle = document.querySelector(".book__title");
const logout = document.querySelector(".logout");
const deleteBookBtn = document.querySelector(".delete__book");
const userName = document.querySelector(".user");
const token = localStorage.getItem("token");
// Event listeners

window.addEventListener("DOMContentLoaded", display);
select.addEventListener("change", addInput);
saveForm.addEventListener("submit", postData);
logout.addEventListener("click", loggingOut);
deleteBookBtn.addEventListener("click", deleteBook);
// display
async function display() {
  const res = await fetch(
    `http://localhost:8000/tbr.com/api/users/${localStorage.getItem(
      "userEmail"
    )}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  const user = await res.json();
  localStorage.setItem("userId", user._id);
  console.log(user);
  userName.innerHTML = `<i class="fas fa-user"></i>${user.name}`;
  const lists = await loadLists();
  populateSelect(lists);
  populateLists(lists);
}

// load lists

async function loadLists() {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`http://localhost:8000/tbr.com/api/lists/${userId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.json();
}

// populate the select
function populateSelect(arr) {
  select.innerHTML = `<option value="new list" selected disabled hidden>
              Choose a list
            </option>
            <option value="new list">new list</option>`;
  for (let elem of arr) {
    select.innerHTML += `<option value="${elem.title}">${elem.title}</option>`;
  }
}

// populate the lists wrapper
function populateLists(arr) {
  listsWrapper.innerHTML = "";
  for (let list of arr) {
    listsWrapper.innerHTML += `<div class="list">
          <div class="text">
            <h4>${list.title}</h4>
            <p>${list.books[0]}...</p>
            <div class="buttons">
              <button class="list__btn">
                <span class="plus__icon">
                  <i class="fas fa-plus"></i>
                </span>
                <span class="icon minus__icon">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
              <button class="delete__list">
              <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <ul class="books">
          </ul>
        </div>`;
  }
  const books = listsWrapper.querySelectorAll(".books");
  const deleteListBtn = listsWrapper.querySelectorAll(".delete__list");
  for (let i = 0; i < arr.length; i++) {
    for (let book of arr[i].books) {
      books[i].innerHTML += `<li>${book}</li>`;
    }
  }
  deleteListBtn.forEach((btn) => {
    btn.addEventListener("click", deleteList);
  });
  toggleList();
}

// add input in form
function addInput() {
  if (select.value == "new list" && !saveForm.querySelector(".list__title")) {
    const input = document.createElement("input");
    input.className = "list__title";
    input.setAttribute("placeholder", "List title");
    saveForm.insertBefore(input, bookTitle);
  } else {
    if (saveForm.querySelector(".list__title")) {
      saveForm.removeChild(saveForm.querySelector(".list__title"));
    }
  }
}

// lists toggling
function toggleList() {
  const lists = document.querySelectorAll(".list");
  lists.forEach((list) => {
    const learnMoreBtn = list.querySelector(".list__btn");
    learnMoreBtn.addEventListener("click", () => {
      list.classList.toggle("show__list");
      lists.forEach((item) => {
        if (item != list) {
          item.classList.remove("show__list");
        }
      });
    });
  });
}

// saving a book
async function postData(e) {
  e.preventDefault();
  const option = select.value;
  let title;
  let books;
  let user = localStorage.getItem("userId");
  let data;
  let url;
  let method;
  let listId;
  if (option == "new list") {
    title = saveForm.querySelector(".list__title").value;
    books = [bookTitle.value];
    url = `http://localhost:8000/tbr.com/api/lists`;
    method = "POST";
  } else {
    const lists = await loadLists();
    title = select.value;
    books = lists.find((list) => list.title == title).books;
    books.push(bookTitle.value);
    listId = lists.find((list) => list.title == title)._id;

    url = `http://localhost:8000/tbr.com/api/lists/${listId}`;
    method = "PUT";
  }
  data = {
    title,
    books,
    user,
  };

  await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(data),
  });

  saveForm.reset();
  display();
}
//deleting a book from a list
async function deleteBook(e) {
  e.preventDefault();
  if (select.value == "new list") return;
  const lists = await loadLists();
  const list = lists.find((list) => list.title == select.value);
  const books = list.books;
  const id = list._id;
  const filteredBooks = books.filter((book) => book != bookTitle.value);
  const data = {
    title: select.value,
    books: filteredBooks,
  };
  await fetch(`http://localhost:8000/tbr.com/api/lists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(data),
  });
  saveForm.reset();
  display();
}

// delete a list
async function deleteList(e) {
  const result = confirm("do you really want to delete this list?");
  if (!result) return;
  const btnParent = e.target.parentElement.parentElement;
  const listTitle = btnParent.querySelector("h4").innerHTML;
  const lists = await loadLists();
  const list = lists.find((list) => list.title == listTitle);

  await fetch(`http://localhost:8000/tbr.com/api/lists/${list._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });

  display();
}
// logging out
function loggingOut(e) {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "./index.html";
}
