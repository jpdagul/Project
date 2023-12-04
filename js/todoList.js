const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = documnet.createElement("li");
    li.textContent = taskText;
    taskList.appendChild(li);
    taskInput.value = "";
  }
  const deleteBtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.addEventListener("click, deleteTask");
  li.appendChild(deletebtn);

  li.addEventListener("click", completeTask);
}

function deleteTask(event) {
  const task = event.target.parentElement;
  taskList.removeChild(task);
}

function completeTask(event) {
  const task = event.target;
  task.classList.toggle("completed");
}
