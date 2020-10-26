const createBoard = (name) => {
  const board = document.createElement('div');
  board.className = 'board';
  board.innerHTML = `
    <div class="board__header">
      <div class="board__title">${name}</div>
    </div>
    <div class="board__draggable"></div>
  `;
  board.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  return board;
}

module.exports = {
  createBoard
}
