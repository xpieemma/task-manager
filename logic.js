// New list to add new item
const addTask = (tasks, name, category, deadline) => {
  const newTask = {
    id:
      (Date.now() + performance.now()) // Convert the sum to a compact alphanumeric string (0-9, a-z)
        .toString(36) + Math.random().toString(36).slice(2, 8), // Generate a random decimal, convert to alphanumeric, and grab 6 stable chars
    name: name,
    category: category,
    deadline: deadline,
    status: "In Progress",
  };
  const newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    newTasks.push(tasks[i]);
  }
  newTasks.push(newTask);
  return newTasks;
};

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
for (let i = 0; i < tasks.length; i++){
    if (tasks[i].id === taskId){
        const updatedTask ={
            id : tasks[i].id,
            name: tasks[i].name,
            category: tasks[i].category,
            deadline: tasks[i].deadline,
            status: newStatus
        };
        newTasks.push(updatedTask);
    } else {
        newTasks.push(tasks[i]);
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
const checkOverdue = (tasks) =>{
    const now = new Date();
    const newTasks = [];
    for (let i =0; i < tasks.length; i++){
const task = tasks[i];
const deadlineDate = new Date(task.deadline);

if (task.status !== 'Completed' && deadlineDate < now){
    const overdueTask ={
        id : task.id,
        name: task.name,
        category: task.category,
        deadline: task.deadline,
        status: 'Overdue'
    };
    newTasks.push(overdueTask);
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

const sortByDeadline = (tasks) => {
  const sorted = [];
  for (anyTask in tasks){
    sorted.push(anyTask);
  }
  for (let i = 0; i<sorted.length-1; i++) {
    for (let z = 0; z<sorted.length-1 -i; z++){
      const date1 = new Date(sorted[z].deadline);
      const date2 = new Date(sorted[z+1].deadline);
      if (date1 > date2) {
        const temp = sorted[z];
        sorted[z] = sorted[z+1];
        sorted[z+1] = temp;
      }
    }

  }
  return sorted;
};

// check the functions
let state = [];

console.log ("%c ---- Adding tasks ----", "color : purple; font-weight bold");
state = addTask(state, "Old Task (Overdue)", "Work", "2020-01-01");
state = addTask(state, "Future Task", "Home", "2030-12-31");
state = addTask(state, "Mid Task", "Urgent", "2025-06-15");
console.table(state);

console.log("%c---CHECKING OVERDUE ---", "color: orange; font-weight: bold");
state = checkOverdue(state);
console.table(state);

console.log("%c--- SORTING BY DATE ---", "color: lightgreen; font-weight: bold");
state = sortByDeadline(state);
console.table(state);

console.log("%c---UPDATE STATUS ---", "color: yellow; font-weight: bold");
// Update the first item in the sorted list
state = updateStatus(state, state[0].id, "Completed");
console.table(state);