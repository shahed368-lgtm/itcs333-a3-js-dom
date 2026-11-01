document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var errorMsg = document.getElementById('error-msg');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');

  var currentFilter = 'all';

  function updateCounter() {
    var left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + ' item(s) left';
  }

  function applyFilter() {
    var items = list.querySelectorAll('li');
    items.forEach(function (li) {
      var done = li.classList.contains('completed');
      var show = currentFilter === 'all' ||
        (currentFilter === 'active' && !done) ||
        (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    });
  }

  function refresh() {
    updateCounter();
    applyFilter();
  }

  function addItem(text) {
    var li = document.createElement('li');

    var span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = text;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');
    addItem(text);
    input.value = '';
    refresh();
  });

  // Event delegation: ONE listener on the list
  list.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    refresh();
  });

  document.getElementById('filter-all').addEventListener('click', function () {
    currentFilter = 'all';
    refresh();
  });
  document.getElementById('filter-active').addEventListener('click', function () {
    currentFilter = 'active';
    refresh();
  });
  document.getElementById('filter-done').addEventListener('click', function () {
    currentFilter = 'done';
    refresh();
  });

  refresh();
});