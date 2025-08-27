// Load todos from localStorage if available
let todoList = JSON.parse(localStorage.getItem('todos')) || [
  { name: 'Build a Calculator', dueDate: '2025-08-10', completed: false },
  { name: 'Add JS to Insure-Landing-Page', dueDate: '2025-07-11', completed: false },
  { name: 'Finish my Amazon Clone', dueDate: '2025-08-31', completed: false },
  { name: 'Design my LinkedIn banner', dueDate: '2025-08-25', completed: false }
];

// Elements
const addButton = document.querySelector('.js-add-button');
const inputElement = document.querySelector('.js-name-input');
const dateInputElement = document.querySelector('.js-due-date-input');
const todoContainer = document.querySelector('.js-todo-list');
const clearButton = document.querySelector('.js-clear-button');

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

// Render todos
function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todo, index) => {
    const checked = todo.completed ? 'checked' : '';
    const completedClass = todo.completed ? 'completed' : '';

    const html = `
      <div class="todo-item">
        <div class="todo-left">
          <input type="checkbox" data-index="${index}" ${checked}>
          <span class="todo-name ${completedClass}">${todo.name}</span>
          <small>${todo.dueDate}</small>
        </div>
        <button onclick="deleteTodo(${index})" class="delete-todo-button">Delete</button>
      </div>
    `;
    todoListHTML += html;
  });

  todoContainer.innerHTML = todoListHTML;

  // Add event listeners for checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idx = e.target.dataset.index;
      todoList[idx].completed = e.target.checked;
      saveTodos();
      renderTodoList();
    });
  });
}

// Add new todo
function addTodo() {
  const newTodo = inputElement.value.trim();
  const dueDate = dateInputElement.value;

  if (newTodo !== '') {
    todoList.push({ name: newTodo, dueDate: dueDate, completed: false });
    inputElement.value = '';
    dateInputElement.value = '';
    saveTodos();
    renderTodoList();
  }
}

// Delete one todo
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  renderTodoList();
}

// Clear all todos
function clearTodos() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    todoList = [];
    saveTodos();
    renderTodoList();
  }
}

// Event Listeners
addButton.addEventListener('click', addTodo);
if (clearButton) clearButton.addEventListener('click', clearTodos);

// Initial render
renderTodoList();
