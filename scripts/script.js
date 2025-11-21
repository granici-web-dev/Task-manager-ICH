const BASE_URL = 'https://jsonplaceholder.typicode.com';

const todoContainer = document.querySelector('.todoList');
const parent = document.querySelector('.parent')

function getTodos() {
  return fetch(`${BASE_URL}/todos`).then((res) => res.json());
}

function getUsers() {
  return fetch(`${BASE_URL}/users`).then((res) => res.json());
}

Promise.all([getTodos(), getUsers()]).then(([todos, users]) => {
  const mergedData = mergeTodosWithUsers(todos, users);
  renderTodoList(mergedData);
});

function mergeTodosWithUsers(todos, users) {
  return todos.map((todo) => {
    const user = users.find((u) => u.id === todo.userId);

    return {
      todosId: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: user.id,
      name: user.name,
      email: user.email,
    };
  });
}

function renderTodoList(mergedData) {
  mergedData.forEach((item) => {
    const el = document.createElement('div');
    el.classList.add('todoList');

    el.innerHTML = `
      <h2>${item.title}</h2>
      <p>Completed: ${item.completed}</p>
      <p>${item.name} (${item.email})</p>
    `;

    parent.appendChild(el);
  });
}

function calculateStatistics(todos) {
  
}