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
