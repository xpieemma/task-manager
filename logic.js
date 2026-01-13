// New list to add new item
const addTask = (tasks, name, category, deadline) => [
  ...tasks,
  {
    id:
      (Date.now() + performance.now()).toString(36) +
      Math.random().toString(36).slice(2, 8),
    name,
    category,
    deadline,
    status: "In Progress",
  },
];

const deleteTask = (tasks, taskId) => {
  const newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== taskId) {
      newTasks.push(tasks[i]);
    }
  }
  return newTasks;
};

const updateStatus = (tasks, taskId, newStatus) => {
  const newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.id === taskId) {
      newTasks.push({ ...task, status: newStatus });
    } else {
      newTasks.push(task);
    }
  }
  return newTasks;
};

// let state = [];
// state = addTask(state, "Buy Milk", "Groceries", "2024-01-20");
// state = addTask(state, "Clean Room", "Chores", "2024-01-21");
// console.log("Add Tasks Result:", state);

// // Update Status (using the ID of the first task)
// const firstId = state[0].id;
// state = updateStatus(state, firstId, "Completed");
// console.log("2. Update Status Result:", state);

// // Delete Task
// state = deleteTask(state, firstId);
// console.log("Delete Task Result (Should be 1 left):", state);

//-----Check Overdue
const checkOverdue = (tasks) => {
  const now = new Date();
  const newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const deadlineDate = new Date(task.deadline);
    if (task.status === "Overdue" && deadlineDate >= now) {
      newTasks.push({ ...task, status: "In Progress" });
    } else if (task.status !== "Completed" && deadlineDate < now) {
      newTasks.push({ ...task, status: "Overdue" });
    } else {
      newTasks.push(task);
    }
  }
  return newTasks;
};

// //data to test
// let state = [];

// // Add Tasks (One is late, one is future)
// state = addTask(state, "Buy Milk (LATE)", "Groceries", "2020-01-20");
// state = addTask(state, "Clean Room (FUTURE)", "Chores", "2030-01-21");
// console.log("Add Tasks Result:");
// console.table(state);

// // Check Overdue
// state = checkOverdue(state);
// console.log("Check Overdue Result:");
// console.table(state);

// // Update Status (Finish the first task)
// const firstId = state[0].id;
// state = updateStatus(state, firstId, "Completed");
// console.log("Update Status Result :");
// console.table(state);

// // Delete Task
// state = deleteTask(state, firstId);
// console.log("Delete Task Result:");
// console.table(state);

// const sortByDeadline = (tasks) => {
//   const sorted = [...tasks];

//   //Bubble sort
//   for (let i = 0; i < sorted.length - 1; i++) {
//     let swapped = false;

//     for (let z = 0; z < sorted.length - 1 - i; z++) {
//       if (new Date(sorted[z].deadline) > new Date(sorted[z + 1].deadline)) {
//         [sorted[z], sorted[z+1]] = [sorted[z+ 1], sorted[z]];
//         swapped = true;
//       }
//     }
//     if(!swapped) break;
//   }
//   return sorted;
// };

const sortByDeadline = (tasks) => {
  return [...tasks].sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
};

// // check the functions
// let state = [];

// console.log ("%c ---- Adding tasks ----", "color : purple; font-weight bold");
// state = addTask(state, "Old Task (Overdue)", "Work", "2020-01-01");
// state = addTask(state, "Future Task", "Home", "2030-12-31");
// state = addTask(state, "Mid Task", "Urgent", "2025-06-15");
// console.table(state);

// console.log("%c---CHECKING OVERDUE ---", "color: orange; font-weight: bold");
// state = checkOverdue(state);
// console.table(state);

// console.log("%c--- SORTING BY DATE ---", "color: lightgreen; font-weight: bold");
// state = sortByDeadline(state);
// console.table(state);

// console.log("%c---UPDATE STATUS ---", "color: yellow; font-weight: bold");
// // Update the first item in the sorted list
// state = updateStatus(state, state[0].id, "Completed");
// console.table(state);






let appState = [];
let isSorted = false;


const filterTasks = (tasks, filterValue) => {
  if (filterValue === "all") return tasks;
  const filtered = [];
  for (let i=0; i<tasks.length; i++){
    const task = tasks[i];
    if (task.status === filterValue || task.category === filterValue) {
      filtered.push(task);
    }
  }
  return filtered;
};

let currentFilter = "all";



const displayTasks = () => {
  // check for overdu items first
  appState = checkOverdue(appState);

  const tbody = document.getElementById("taskListBody");
  tbody.innerHTML = "";

//tasks after filtering
  let tasksToShow = filterTasks(appState, currentFilter);
//sort if needed 
if (isSorted){

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
  displayTasks();
};

const handleDelete = (id) => {
  appState = deleteTask(appState, id);
  displayTasks();
};

window.onload = () => {
  document.getElementById("addBtn").onclick = () => {
    const name = document.getElementById("taskName").value;
    const cat = document.getElementById("taskCategory").value;
    const date = document.getElementById("taskDeadLine").value;

    if (name !== "" && date !== "") {
      appState = addTask(appState, name, cat, date);
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
  displayTasks();
};
