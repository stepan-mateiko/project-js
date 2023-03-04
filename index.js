const firstModal = document.getElementById("first-modal");
const nextBtn = document.getElementById("next-btn");
const mainWindow = document.getElementById("main-window");
const addBtn = document.getElementById("add-btn");
let itemsList = document.getElementById("items-list");
const nameInput = document.getElementById("name");
const total = document.getElementById("total");
const totalDone = document.getElementById("totalDone");
const allItems = [];
const activeItems = [];
const doneItems = [];

const addField = document.createElement("input");
const addFieldBtn = document.createElement("button");

// take name and go to next window
nextBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const formData = new FormData(firstModal);
  const formValues = Object.fromEntries(formData.entries());
  const greeting = document.getElementById("greeting");
  greeting.innerText = formValues.name;
  firstModal.style.display = "none";
  mainWindow.style.display = "block";
  openMainWindow();
});

// save name in local storage
const storedName = localStorage.getItem("greeting");
if (storedName) {
  firstModal.style.display = "none";
  mainWindow.style.display = "block";
  greeting.textContent = storedName;
} else {
  firstModal.style.display = "block";
  mainWindow.style.display = "none";
}
function openMainWindow() {
  const name = nameInput.value;
  if (name) {
    localStorage.setItem("greeting", name);
    firstModal.style.display = "none";
    mainWindow.style.display = "block";
    greeting.textContent = name;
  }
}

// add new list item
addBtn.addEventListener("click", function (event) {
  addField.type = "text";
  addField.id = "add-item";
  addField.name = "add-item";
  addField.placeholder = "Add new item";
  addFieldBtn.innerText = "add";
  mainWindow.appendChild(addField);
  mainWindow.appendChild(addFieldBtn);
});

// confirm creating new item
addFieldBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const newItem = document.createElement("li");
  const newItemText = document.createElement("span");
  newItemText.innerText = addField.value;
  newItem.dataset.status = "active";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "delete";
  newItem.appendChild(checkbox);
  newItem.appendChild(newItemText);
  newItem.appendChild(editBtn);
  newItem.appendChild(deleteBtn);
  itemsList.appendChild(newItem);
  mainWindow.removeChild(addField);
  mainWindow.removeChild(addFieldBtn);
  allItems.push(addField.value);
  total.innerText = allItems.length;
  itemsList = document.getElementById("items-list");
  const index = itemsList.children.length;
  newItem.id = `list=item${index}`;
  editBtn.addEventListener("click", () => {
    editItem(newItem.id);
  });
  deleteBtn.addEventListener("click", () => {
    deleteItem(newItem.id);
  });
  checkbox.addEventListener("change", () => {
    makeDone(checkbox, newItem.id);
  });
});

// check as done
function makeDone(checkbox, itemId) {
  const span = checkbox.nextSibling;
  const li = document.getElementById(itemId);
  if (checkbox.checked) {
    span.style.textDecoration = "line-through";
    doneItems.push(span);
    activeItems.pop(span);
    totalDone.innerText = doneItems.length;
    li.dataset.status = "done";
  } else {
    span.style.textDecoration = "none";
    doneItems.pop(span);
    activeItems.push(span);
    totalDone.innerText = doneItems.length;
    li.dataset.status = "active";
  }
  displayItems();
}

// edit list item
function editItem(itemId) {
  const li = document.getElementById(itemId);
  if (li) {
    const span = li.querySelector("span");
    const input = document.createElement("input");
    const edit = li.querySelector("button");
    input.type = "text";
    input.value = span.innerText;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveItem(itemId, input.value);
      } else if (event.key === "Escape") {
        cancelEdit(itemId);
      }
    });
    span.replaceWith(input);
    input.focus();
  }
}
function saveItem(itemId, newText) {
  const li = document.getElementById(itemId);
  if (li) {
    const input = li.querySelector("input[type=text]");
    const span = document.createElement("span");
    span.innerText = newText;
    input.replaceWith(span);
  }
}

function cancelEdit(itemId) {
  const li = document.getElementById(itemId);
  if (li) {
    const input = li.querySelector("input[type=text]");
    const span = document.createElement("span");
    span.innerText = input.dataset.originalText;
    input.replaceWith(span);
  }
}

// delete list item
function deleteItem(itemId) {
  const li = document.getElementById(itemId);
  const item = li.children[1].innerText;
  console.log(item);
  if (li) {
    allItems.pop(item);
    activeItems.pop(item);
    doneItems.pop(item);
    total.innerText = allItems.length;
    totalDone.innerText = doneItems.length;
    li.remove();
  }
}

// filter active done and all
const filterAllButton = document.getElementById("filter-all");
const filterActiveButton = document.getElementById("filter-active");
const filterDoneButton = document.getElementById("filter-done");
let filter = "all";
filterAllButton.addEventListener("click", () => {
  filter = "all";
  displayItems();
});

filterActiveButton.addEventListener("click", () => {
  filter = "active";
  displayItems();
});

filterDoneButton.addEventListener("click", () => {
  filter = "done";
  displayItems();
});

function displayItems() {
  // new function
  const items = Array.from(itemsList.children);
  items.forEach((item) => {
    const status = item.dataset.status;
    if (
      filter === "all" ||
      (filter === "active" && status === "active") ||
      (filter === "done" && status === "done")
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
