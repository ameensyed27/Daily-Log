// Get elements from the DOM
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText !== "") {
    const li = document.createElement('li');

    // Add a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTasks();
    });

    // Add task text and due date
    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${taskText} (Due: ${dueDate || 'No date'})`;

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
      taskList.removeChild(li);
      saveTasks();
    };

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    // Add the list item to the task list
    taskList.appendChild(li);

    // Clear the input fields
    taskInput.value = "";
    dueDateInput.value = "";

    // Save tasks to localStorage
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    const taskText = li.querySelector('span').textContent;
    const isCompleted = li.querySelector('input').checked;
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');

    // Add a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTasks();
    });

    // Add task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
      taskList.removeChild(li);
      saveTasks();
    };

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);

    // Add the list item to the task list
    taskList.appendChild(li);
  });
}

// Load tasks when the page loads
window.onload = loadTasks;

// Add task when the button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
