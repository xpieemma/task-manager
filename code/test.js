console.group("Task Manager Test");


setTimeout(() => {
  console.log("Starting Tests...\n");

  const emptyState = [];
  const added = addTask(emptyState, "Test Task", "Work", "2030-01-01");

  console.assert(emptyState.length === 0, "Add mutated original array");
  console.assert(added.length === 1, "Add failed");
  console.assert(
    added[0].status === "In Progress",
    "Default status incorrect"
  );

  console.log(" Add Task (Immutable): PASS");

 
  const taskId = added[0].id;
  const updated = updateStatus(added, taskId, "Completed");

  console.assert(
    added[0].status === "In Progress",
    "Update mutated original task"
  );
  console.assert(updated[0].status === "Completed", "Status not updated");

  console.log(" Update Status (Immutable): PASS");


  const deleted = deleteTask(updated, taskId);

  console.assert(updated.length === 1, "Delete mutated original array");
  console.assert(deleted.length === 0, "Delete failed");

  console.log("Delete Task (Immutable): PASS");


  let overdueState = [];
  overdueState = addTask(overdueState, "Past Task", "Work", "2020-01-01");
  overdueState = addTask(overdueState, "Future Task", "Work", "2030-01-01");

  const checked = checkOverdue(overdueState);

  console.assert(
    checked[0].status === "Overdue",
    "Past task not marked overdue"
  );
  console.assert(
    checked[1].status === "In Progress",
    "Future task incorrectly marked"
  );

  console.log("Overdue Check: PASS");

 
  const sorted = sortByDeadline(checked);

  console.assert(
    new Date(sorted[0].deadline) <= new Date(sorted[1].deadline),
    " Sorting by deadline failed"
  );

  console.log("Sort by Deadline: PASS");

  console.log("\n All Tests Passed");
  console.groupEnd();
}, 300);

