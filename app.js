// DOM Elements
const taskNameInput = document.getElementById("taskName");
const taskCategoryInput = document.getElementById("taskCategory");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskStatusInput = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");
const message = document.getElementById("message");
const clearTasksBtn = document.getElementById("clearTasksBtn");

const taskTableBody = document.getElementById("taskTableBody");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");

// Array that holds all task objects
let tasks = [];

// Initialization
loadTasks();
populateCategoryFilter();
renderTasks();

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
statusFilter.addEventListener("change", renderTasks);
categoryFilter.addEventListener("change", renderTasks);
clearTasksBtn.addEventListener("click", clearTaskList);

// Event Delegation
taskTableBody.addEventListener("change", handleStatusChange);

// Adds a new task to the task array
function addTask() {
  const name = taskNameInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const status = taskStatusInput.value;

  // Basic validation
  if (!name || !category || !deadline) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  // Create task object
  const task = {
    id: Date.now(),
    name,
    category,
    deadline,
    status,
  };

  // Add task to array
  tasks.push(task);

  // Save and update UI
  saveTasks();
  populateCategoryFilter();
  renderTasks();

  // Reset Inputs
  taskNameInput.value = "";
  taskCategoryInput.value = "";
  taskDeadlineInput.value = "";
  taskStatusInput.value = "Not Started";

  message.textContent = "Task added successfully!";
  message.style.color = "green";
}

// Display tasks in the table based on filters
function renderTasks() {
  taskTableBody.innerHTML = "";

  checkOverdueTasks();

  const statusValue = statusFilter.value;
  const categoryValue = categoryFilter.value;

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusValue === "All" || task.status === statusValue;
    const categoryMatch =
      categoryValue === "All" || task.category == categoryValue;
    return statusMatch && categoryMatch;
  });

  filteredTasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.category}</td>
            <td>${task.deadline}</td>
            <td class="${getStatusClass(task.status)}">${task.status}</td>
            <td>
                <select class="status-select" data-id="${task.id}">
          <option value="Not Started" ${
            task.status === "Not Started" ? "selected" : ""
          }>Not Started</option>
          <option value="In Progress" ${
            task.status === "In Progress" ? "selected" : ""
          }>In Progress</option>
          <option value="Completed" ${
            task.status === "Completed" ? "selected" : ""
          }>Completed</option>
          <option value="Overdue" ${
            task.status === "Overdue" ? "selected" : ""
          }>Overdue</option>
        </select>
            </td>
        `;
    taskTableBody.appendChild(row);
  });
}

// Event Delegation Handler
function handleStatusChange(event) {
  if (!event.target.classList.contains("status-select")) return;

  const taskId = Number(event.target.dataset.id);
  const newStatus = event.target.value;

  updateStatus(taskId, newStatus);
}

// Update status of a task
function updateStatus(taskId, newStatus) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
    saveTasks();
    renderTasks();
  }
}

// Auto mark tasks as overdue if deadline has passed
function checkOverdueTasks() {
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task) => {
    if (task.deadline < today && task.status !== "Completed") {
      task.status = "Overdue";
    }
  });

  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Populate category filter dropdown
function populateCategoryFilter() {
  const categories = [...new Set(tasks.map((task) => task.category))];

  categoryFilter.innerHTML = `<option value="All">All Categories</option>`;

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Returns class based on task status
function getStatusClass(status) {
  if (status === "Overdue") return "overdue";
  if (status === "Completed") return "completed";
  if (status === "Not Started") return "not-started";
  if (status === "In Progress") return "in-progress";
  return "";
}

// Clear Task List
function clearTaskList() {
  // Confirm before deletion
  const confirmClear = confirm("Are you sure you want to clear all tasks?");

  if (!confirmClear) return;

  // Clear data
  tasks = [];
  localStorage.removeItem("tasks");

  // Reset UI
  populateCategoryFilter();
  renderTasks();

  message.textContent = "All tasks cleared.";
  message.style.color = "green";
}
