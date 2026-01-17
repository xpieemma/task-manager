

const filterTasks = (tasks, filterValue) => {
  if (filterValue === "all") return tasks;
  const filtered = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.status === filterValue || task.category === filterValue) {
      filtered.push(task);
    }
  }
  return filtered;
};


const displayTasks = () => {
  // check for overdu items first
  appState = checkOverdue(appState);
  saveToStorage(appState);

  const tbody = document.getElementById("taskListBody");
  tbody.innerHTML = "";

  //tasks after filtering
  let tasksToShow = filterTasks(appState, currentFilter);
  //sort if needed
  if (isSorted) {
    tasksToShow = sortByDeadline(tasksToShow);
  }

  for (const task of tasksToShow) {
    const tr = document.createElement("tr");

    //class naming

    let statusClass = "status-InProgress";

    if (task.status === "Completed") {
      statusClass = "status-Completed";
    }

    if (task.status === "Overdue") {
      statusClass = "status-Overdue";
    }

    tr.innerHTML = `
    <td>${task.name}</td>
            <td><span class="category-tag">${task.category}</span></td>
            <td>${new Date(task.deadline).toLocaleString()}</td>
            <td class="${statusClass}">${task.status}</td>
            <td>
                <div class="action-group">
                    <select onchange="handleStatusChange('${
                      task.id
                    }', this.value)">
                        <option value="" disabled selected>Update</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button class="delete-btn" onclick="handleDelete('${
                      task.id
                    }')">Delete</button>
                </div>
            </td>
    `;
    tbody.appendChild(tr);
  }
};

const handleStatusChange = (id, status) => {
  appState = updateStatus(appState, id, status);
  saveToStorage(appState)
  displayTasks();
};

const handleDelete = (id) => {
  appState = deleteTask(appState, id);
  saveToStorage(appState);
  displayTasks();
};

document.getElementById("addBtn").onclick = () => {
  const name = document.getElementById("taskName").value;
  const cat = document.getElementById("taskCategory").value;
  const date = document.getElementById("taskDeadLine").value;


    if (name !== "" && date !== "") {
      appState = addTask(appState, name, cat, date);
      saveToStorage(appState);
      displayTasks();
      document.getElementById("taskName").value = "";
    } else {
      alert("Please enter a task name and deadline.");
    }
  };
  document.getElementById("sortBtn").onclick = () => {
    isSorted = !isSorted;
    document.getElementById("sortBtn").textContent = isSorted
      ? "Remove Sort"
      : "Sort by Deadline";
    displayTasks();
  };

  document.getElementById("filterSelect").onchange = (e) => {
    currentFilter = e.target.value;
    displayTasks();
  };
 

const STORAGE_KEY = "task-manager-state";

const saveToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const loadFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

let appState = loadFromStorage();
let isSorted = false;
let currentFilter = "all";