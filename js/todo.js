let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoList = document.getElementById('todoList');
const taskInput = document.getElementById('taskInput');

function initTodoList() {
    todoList.innerHTML = '';
    storedTasks.forEach(task => addTaskElement(task));
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        addTaskElement(taskText);
        taskInput.value = '';
    }
}

function addTaskElement(taskTextString) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex-list__item', 'task')

    const taskText = document.createElement('div')
    taskText.classList.add('task__text')
    taskText.innerText = taskTextString
    taskItem.appendChild(taskText)

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'button_small', 'button_primary')
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => {
        deleteTask(taskTextString);
    };
    taskItem.appendChild(deleteButton);

    todoList.appendChild(taskItem);
}

function deleteTask(taskText) {
    const taskIndex = storedTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        storedTasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        initTodoList();
    }
}

function clearTasks() {
    localStorage.removeItem('tasks');
    todoList.innerHTML = '';
    storedTasks = [];
}


taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

window.onload = initTodoList;