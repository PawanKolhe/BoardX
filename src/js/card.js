import { generateListId } from './utils';

const getCardHTML = ({ task, id }) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;
  card.innerHTML = `
    <div class="card__text">${task}</div>
    <div class="card__close">
      <i class="fas fa-times"></i>
    </div>
  `;
  card.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  card.querySelector('.card__close').addEventListener('click', (e) => {
    removeCard();
  });
  return card;
}

const removeCard = () => {

}

const renderCard = (listId, card) => {
  const cardHTML = getCardHTML(card);
  document.querySelector('#listsContainer').querySelector(`#listID-${listId} .list__draggable`).appendChild(cardHTML);
}

const createCard = (boardState, listName, task) => {
  const listId = generateListId(listName);
  const list = boardState.lists.find(list => list.id === listId);
  const card = {
    task,
    id: (boardState.cardCount + 1).toString(),
  };
  boardState.cardCount++;
  list.cards.push(card);
  renderCard(listId, card);
  // Save board state
  localStorage.setItem('boardState', JSON.stringify(boardState));
}

module.exports = {
  getCardHTML,
  renderCard,
  createCard
}
