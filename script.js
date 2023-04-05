const newToDoInput = document.getElementById("new-todo");
const addToDoButton = document.getElementById("add-todo");
const toDoList = document.getElementById("todo-list");
const ul = document.querySelector("ul");
const checkBox = document.getElementById("hiding");
const inputSearch = document.querySelector("#search-todo input");
const spanDelete = `<button class="span_delete btn btn-warning" type="button">Delete</button>`;

// CREATING NEW TODO FUNCTION
addToDoButton.addEventListener("click", function () {
  if (newToDoInput.value) {
    const newLine = document.createElement("span");
    newLine.className = "newline";
    newLine.textContent = newToDoInput.value;

    const li = document.createElement("li");

    li.appendChild(newLine);
    li.innerHTML += spanDelete;

    toDoList.appendChild(li);

    storeToLocalStorage(newToDoInput.value);

    newToDoInput.value = "";
    newToDoInput.focus();
  } else {
    window.alert("Don't forget to add a To-do list");
  }
});

// REMOVE FUNCTION FOR DELETE BUTTON
ul.addEventListener("click", function (e) {
  if (e.target.className === "span_delete btn btn-warning") {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.children[0].textContent);
  }
});

// LOCAL STORAGE FUNCTIONS FOR SAVING, LOADING AND REMOVING
document.addEventListener("DOMContentLoaded", function (e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let item of tasks) {
    const newLine = document.createElement("span");
    newLine.className = "newline";
    newLine.textContent = item;

    const li = document.createElement("li");

    li.appendChild(newLine);
    li.innerHTML += spanDelete;

    toDoList.appendChild(li);
  }
});

function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }
  tasks.push(task);

  localStorage.setItem("tasks", tasks);
}

function removeFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks").split(",");
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === task) {
      tasks.splice(i, 1);
    }
  }

  if (tasks.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("tasks", tasks);
  }
}

// CHECKBOX FUNCTION
checkBox.addEventListener("change", function () {
  if (checkBox.checked === true) {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
});

// SEARCH FUNCTION
inputSearch.addEventListener("keyup", function () {
  const searchValue = inputSearch.value.toLowerCase();
  for (let item of ul.children) {
    const textContent = item.firstElementChild.textContent.toLowerCase();
    if (textContent.includes(searchValue)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  }
});

// ONE TIME ALERT WHEN THE PAGE UPLOADS FOR THE FIRST TIME
window.onload = function () {
  if (!localStorage.getItem("alertShown")) {
    alert(
      "Welcome to My To Do List page, You can create your to-do list by typing in the input bar and pressing the Add button, If are get board you can hide them by checking the hide items Checkbox. You can also search between your to-do list to find a specific to-do! Remember that you can upload the page or close it and your to-do list will be there for you until next visit, ENJOY YOUR DAY WITH YOUR NEW ONLINE TO-DO PAGE... "
    );
    localStorage.setItem("alertShown", true);
  }
};
