// --- Check Login Status ---
if (window.location.pathname.includes("index.html")) {
    if (!localStorage.getItem("loggedIn")) {
      window.location.href = "login.html";
    }
  }
  
  // --- DOM Elements ---
  const taskInput = document.getElementById("task");
  const categorySelect = document.getElementById("category");
  const dueDateInput = document.getElementById("due-date");
  const taskList = document.getElementById("task-list");
  const filterSelect = document.getElementById("filter-category");
  
  // --- Load Tasks on Start ---
  document.addEventListener("DOMContentLoaded", loadTasks);
  
  // --- Add Task ---
  function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const dueDate = dueDateInput.value;
  
    if (!taskText) {
      alert("Please enter a task.");
      return;
    }
  
    const task = {
      id: Date.now(),
      text: taskText,
      category: category,
      dueDate: dueDate,
      done: false
    };
  
    const tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);
  
    renderTasks(tasks);
    taskInput.value = "";
    dueDateInput.value = "";
  }
  
  // --- Render Tasks ---
  function renderTasks(tasks) {
    const filter = filterSelect.value;
    taskList.innerHTML = "";
  
    tasks.forEach(task => {
      if (filter !== "all" && task.category !== filter) return;
  
      const li = document.createElement("li");
      li.className = task.done ? "done" : "";
  
      li.innerHTML = `
        <span>${task.text}</span>
        <small>📅 ${task.dueDate || "No date"} | 🌱 ${task.category}</small>
        <div>
          <button onclick="toggleDone(${task.id})">✔️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
  
      taskList.appendChild(li);
    });
  }
  
  // --- Toggle Done ---
  function toggleDone(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(t => t.id === id);
    if (task) task.done = !task.done;
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  }
  
  // --- Delete Task ---
  function deleteTask(id) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  }
  
  // --- Get & Save Tasks ---
  function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
  
  function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // --- Filter Change ---
  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const tasks = getTasksFromStorage();
      renderTasks(tasks);
    });
  }
  
  // --- Load on Start ---
  function loadTasks() {
    const tasks = getTasksFromStorage();
    renderTasks(tasks);
  }
  
