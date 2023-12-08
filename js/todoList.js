// const taskInput = document.getElementById("taskInput");
// const taskList = document.getElementById("taskList");

// function addTask() {
//   const taskText = taskInput.value.trim();
//   if (taskText !== "") {
//     const li = document.createElement("li");
//     li.textContent = taskText;
//     taskList.appendChild(li);
//     taskInput.value = "";
//     li.addEventListener("click", completeTask);

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.addEventListener("click", deleteTask);
//     li.appendChild(deleteBtn);
//   }
// }

// function deleteTask(event) {
//   const task = event.target.parentElement;
//   taskList.removeChild(task);
// }

// function completeTask(event) {
//   const task = event.target;
//   task.classList.toggle("completed");
// }

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

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
    });
  }
}

function deleteTask(event) {
  const task = event.target.parentElement;
  taskList.removeChild(task);
}

function completeTask(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle("completed");
}
