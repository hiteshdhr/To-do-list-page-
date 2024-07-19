
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

// Add new task
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
    }
});

// Toggle task completion
taskList.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        const taskId = parseInt(event.target.getAttribute('data-id'));
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderTasks();
        }
    }
});

// Delete task
taskList.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    if (event.target.tagName.toLowerCase() === 'li') {
        const taskId = parseInt(event.target.getAttribute('data-id'));
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

