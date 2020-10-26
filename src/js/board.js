const createList = (name) => {
  const list = document.createElement('div');
  list.className = 'list';
  list.innerHTML = `
    <div class="list__header">
      <div class="list__title">${name}</div>
      <img class="list__drag" src="./assets/drag-dots.svg" alt="drag" />
    </div>
    <div class="list__draggable"></div>
  `;
  list.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  return list;
}

module.exports = {
  createList
}
