const $inputText = document.querySelector('.input-text');
const $taskList = document.querySelector('.tasks-list');
const $numberOfTasks = document.querySelector('.number-of-tasks');

const createTask = () => {
  const $task = document.createElement('li');
  const $paragraph = document.createElement('p');
  const $button = document.createElement('button');
  $task.classList.add('task');
  $paragraph.textContent = $inputText.value;
  $button.textContent = `Done`;
  $button.classList.add('done-btn');
  $button.addEventListener('click', done);
  $task.appendChild($paragraph);
  $task.appendChild($button);
  $taskList.insertAdjacentElement('afterbegin', $task);

  localStorage.setItem('todo', JSON.stringify($taskList.innerHTML));
};

const done = (e) => {
  e.target.parentElement.style.opacity = 0;
  e.target.parentElement.style.transform = `translateX(20%)`;
  setTimeout(() => {
    e.target.parentElement.remove();
    $numberOfTasks.textContent = `${$taskList.children.length}`;
    localStorage.setItem('todo', JSON.stringify($taskList.innerHTML));
  }, 400);
};

if (localStorage.getItem('todo') !== null) {
  $taskList.innerHTML = JSON.parse(localStorage.getItem('todo'));
  document
    .querySelectorAll('.task')
    .forEach((el) => el.children[1].addEventListener('click', done));
  $numberOfTasks.textContent = `${$taskList.children.length}`;
}

document.addEventListener('click', (e) => {
  if (e.target.matches('.add-btn')) {
    if ($inputText.value === '') return alert('write something please');
    createTask();
    $inputText.value = '';
    $numberOfTasks.textContent = `${$taskList.children.length}`;
  }

  if (e.target.matches('.clear-btn')) {
    $taskList.style.opacity = 0;
    $taskList.style.transform = `translateX(20%)`;
    setTimeout(() => {
      $taskList.style.opacity = 1;
      $taskList.style.transform = `translateX(0)`;
      $taskList.innerHTML = '';
      $numberOfTasks.textContent = `${$taskList.children.length}`;
      localStorage.setItem('todo', JSON.stringify($taskList.innerHTML));
    }, 400);
  }
});

$inputText.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    if ($inputText.value === '') return alert('write something please');
    createTask();
    $inputText.value = '';
    $numberOfTasks.textContent = `${$taskList.children.length}`;
  }
});
