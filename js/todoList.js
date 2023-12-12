// Get the task input field and task list from the DOM
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Initialize a counter and set a maximum number of tasks
let counter = 0;
const maxTasks = 15;

// When the document is loaded, load tasks from local storage
document.addEventListener("DOMContentLoaded", function () {
  // Get tasks from local storage, or an empty array if there are none
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Add each saved task to the DOM
  savedTasks.forEach((task) => addTaskToDOM(task));
});

// Function to add a new task
function addTask() {
  // Get the task text from the input field and trim any whitespace
  const taskText = taskInput.value.trim();
  // Get the current number of tasks
  const currentTasks = taskList.children.length;
  // If the task text is not empty and we haven't reached the maximum number of tasks
  if (taskText !== "" && currentTasks < maxTasks) {
    // Add the task to the DOM
    addTaskToDOM({ text: taskText, completed: false });
    // Get tasks from local storage, or an empty array if there are none
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Add the new task to the array of saved tasks
    savedTasks.push({ text: taskText, completed: false });
    // Save the updated array of tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

// Function to add a task to the DOM
function addTaskToDOM(task) {
  // Create a new li element
  const li = document.createElement("li");
  // Set the text of the li element to the task text
  li.textContent = task.text;

  // Create a new delete button
  const deleteBtn = document.createElement("button");
  // Set the text of the delete button
  deleteBtn.textContent = "🗑️";
  // Add an event listener to the delete button to delete the task when clicked
  deleteBtn.addEventListener("click", deleteTask);
  // Add the delete button to the li element
  li.appendChild(deleteBtn);

  // Add the li element to the task list
  taskList.appendChild(li);

  // Add an event listener to the li element to toggle the completed status when clicked
  li.addEventListener("click", function () {
    // Toggle the completed status of the task
    task.completed = !task.completed;
    // Toggle the "completed" class on the li element
    li.classList.toggle("completed");
    // Update the tasks in local storage
    updateLocalStorage();
  });
}

// Function to mark a task as completed
function completeTask(event) {
  // Get the li element of the task
  const listItem = event.target.parentElement;
  // Toggle the "completed" class on the li element
  listItem.classList.toggle("completed");
  // Update the tasks in local storage
  updateLocalStorage();
}

// Function to delete a task
function deleteTask(event) {
  // Get the li element of the task
  const task = event.target.parentElement;
  // Remove the li element from the task list
  taskList.removeChild(task);
  // Update the tasks in local storage
  updateLocalStorage();
}

// Function to update the tasks in local storage
function updateLocalStorage() {
  // Get the text of each task in the task list
  const tasks = Array.from(taskList.children).map((li) => li.textContent);
  // Save the tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
window.onload = function () {
  alert(
    "Welcome to the To-Do List! Here's how it works:\n\n1. Enter a task in the input field.\n2. Click 'Add Task' to add it to the list.\n3. Click on a task to mark it as completed.\n4. Click the delete button next to a task to remove it from the list.\n5. Hope you enjoy the to-do list! Also don't be afraid to give some feedback!"
  );
};
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the page loads, open the modal
window.onload = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
