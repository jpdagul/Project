const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTaskToDOM(task));
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    // Save task to local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Add task to the DOM
    addTaskToDOM(taskText);
  }
}

function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (savedTasks.includes(taskText)) {
    li.classList.add("completed");
  }

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.addEventListener("click", completeTask);
  li.appendChild(completeBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", deleteTask);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateLocalStorage();
  });
}
function deleteTask(event) {
  const task = event.target.parentElement;
  taskList.removeChild(task);
  updateLocalStorage();
}

function completeTask(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle("completed");
  const textElement = listItem.querySelector("li");
  updateLocalStorage();
}

function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map((li) => li.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const completed = document.getElementById("taskList"); // Replace "parentElementId" with your actual parent element's ID
console.log(completed);
const children = completed.children;
const numberOfChildren = children.length;
console.log("Number of children:", numberOfChildren);
const completedTasks = document.querySelectorAll(".completed");

completedTasks.forEach((task) => {
  // Apply styles or modifications to each completed task
  task.style.textDecoration = "line-through";
  // You can add more modifications here if needed
});

let countchild = () => {
  const completed = document.getElementById("taskList");
  console.log(completed);
  const children = completed.children;
  const numberOfChildren = children.length;
  console.log("Number of children:", numberOfChildren);

  // Show each child element
  for (let i = 0; i < children.length; i++) {
    console.log(children[i]);
  }
  firstListItem = document.querySelector("#taskList > li:first-child");
  firstButton = document.querySelector("#taskList > li:first-child button");
  firstButton.addEventListener("click", () => {
    firstListItem.style.textDecoration = "line-through";
  });
};