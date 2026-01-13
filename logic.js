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

let state = [];
state = addTask(state, "Buy Milk", "Groceries", "2024-01-20");
state = addTask(state, "Clean Room", "Chores", "2024-01-21");
console.log("Add Tasks Result:", state);

// Update Status (using the ID of the first task)
const firstId = state[0].id;
state = updateStatus(state, firstId, "Completed");
console.log("2. Update Status Result:", state);

// Delete Task
state = deleteTask(state, firstId);
console.log("Delete Task Result (Should be 1 left):", state);