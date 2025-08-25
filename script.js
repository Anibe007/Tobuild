
const todoList = [{
  name: 'Build a Calculator',
  dueDate: '2025-08-10',
}, {
  name: 'Add JS to Insure-Landing-Page',
  dueDate: '2025-07-11'
}, {
  name: 'Finish my Amazon Clone',
  dueDate: '2025-08-31'
}, {
  name: 'Design my linkedln banner',
  dueDate: '2025-08-25'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;

    const html = `<div>${name}</div>
    <div>${dueDate}</div>
      <button onclick="deleteTodo(${i}); renderTodoList();"
       class="delete-todo-button">Delete</button>`;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

const addButton = document.querySelector('.js-add-button');
const inputElement = document.querySelector('.js-name-input');
const dateInputElement = document.querySelector('.js-due-date-input');

function addTodo() {
  const newTodo = inputElement.value;
  const dueDate = dateInputElement.value;

  if (newTodo.trim() !== '') {
    todoList.push({
      name: newTodo,
      dueDate: dueDate
    });
    inputElement.value = '';
    dateInputElement.value = '';
    renderTodoList();
  }
}

addButton.addEventListener('click', addTodo);
