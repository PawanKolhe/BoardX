import { generateListId } from './utils';

const getCardHTML = ({ task }) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__text">${task}</div>
  `;
  card.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  return card;
}

const createCard = (boardState, listName, task) => {
  const card = {
    task
  };
  const listId = generateListId(listName);
  const list = boardState.lists.find(list => list.id === listId);
  list.cards.push(card);

  document.querySelector('#listsContainer').querySelector(`#listID-${listId} .list__draggable`).appendChild(getCardHTML(card));
}

module.exports = {
  getCardHTML,
  createCard
}
