function changeCheckBox(value) {
  let counter = 0;
  for (let i = 1; i <= value; i++)
  {
    const checkbox = document.getElementById(i.toString());
    if (checkbox.checked)
      continue;
    else
      counter++;
  }
  return counter;
}

function checkTodo() {
  const items = document.querySelectorAll('.list-group-item');

  for (let i = 1; i <= items.length; i++)
  {
    const checkbox = document.getElementById(i.toString());

    checkbox.addEventListener("change", function() {
      updateCounter(items.length);
      let todos = setTodos(items.length);

      render(todos);
    });
  }
}
function updateCounter(value)
{
  const itemCountElement = document.getElementById('item-count');
  const uncheckedCountElement = document.getElementById('unchecked-count');

  itemCountElement.textContent = value;
  uncheckedCountElement.textContent = changeCheckBox(value);
}

function setTodos(value) {
  let todos = new Set();

  let counter = 0;

  for (let i = 1; i <= value; i++)
  {
    const checkbox = document.getElementById(i.toString());

    let todo = new Map();

    if (checkbox.checked)
      todo.set('ischeck', true);
    else
      todo.set('ischeck', false);

    let spans = document.getElementsByTagName("span");

    todo.set('text', spans[counter + 4].textContent);

    todos.add(todo);

    counter++;
  }

  return todos;
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const items = document.querySelectorAll('.list-group-item');

let data = setTodos(items.length);

checkTodo();
updateCounter(items.length);

function render(todos)
{
  let content = '';

  let rTodos = renderTodo(todos)

  rTodos.forEach(function(value){
    content += value;
  });

  list.innerHTML = content;

  checkTodo();
}

function newTodo() {
  let todo_name = prompt("Введіть назву");

  const items = document.querySelectorAll('.list-group-item');

  let todos = setTodos(items.length);

  if (todo_name)
  {
    let todo = new Map();

    todo.set('ischeck', false);
    todo.set('text', todo_name);

    todos.add(todo);

    render(todos);
    updateCounter(items.length + 1);
  }
  else
    alert("Ви нічого не ввели!");
}

function deleteTodo(index) {
  const items = document.querySelectorAll('.list-group-item');

  let todos = setTodos(items.length);
  let counter = 1;

  todos.forEach(function(value){
    if (counter === index) {
      todos.delete(value);
    }
    counter++;
  });

  render(todos);
  updateCounter(counter - 2);
}

function renderTodo(todos)
{
  let rTodos = new Set();
  let counter = 1;

  todos.forEach(function(value) {
    if (value.get('ischeck') === false) {
      rTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ counter + '" />\n<label for="'+ counter + '"><span class="  ">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + counter + ')">delete</button>\n</li>');
    }
    else if (value.get('ischeck') === true) {
      rTodos.add('<li class="list-group-item">\n<input type="checkbox" class="form-check-input me-2" id="'+ counter + '" checked />\n<label for="'+ counter + '"><span class="text-success text-decoration-line-through">' + value.get('text') + '</span></label>\n<button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(' + counter + ')">delete</button>\n</li>');
    }
    counter++;
  });

  return rTodos;
}