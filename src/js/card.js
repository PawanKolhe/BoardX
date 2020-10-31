import { generateListId, encodeHTML } from './utils';

const getCardHTML = ({ task, id }) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-id', id);
  card.innerHTML = `
    <div class="card__text">${encodeHTML(task)}</div>
    <div class="card__close">
      <i class="fas fa-times"></i>
    </div>
  `;
  card.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  card.querySelector('.card__close').addEventListener('click', (e) => {
    removeCard(id);
  });
  return card;
}

const removeCard = (cardId) => {
  const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
  const listId = cardElement.parentElement.parentElement.getAttribute('data-id');
  const list = boardState.lists.find(list => list.id === listId);
  const cardIndex = list.cards.findIndex(card => card.id === cardId);
  list.cards.splice(cardIndex, 1);
  cardElement.remove();
  boardState.cardCount--;
  // Save board state
  localStorage.setItem('boardState', JSON.stringify(boardState));
}

const renderCard = (listId, card) => {
  const cardHTML = getCardHTML(card);
  document.querySelector('#listsContainer').querySelector(`.list[data-id="${listId}"] .list__draggable`).appendChild(cardHTML);
}

const createCard = (listName, task) => {
  const listId = generateListId(listName);
  const list = boardState.lists.find(list => list.id === listId);
  const card = {
    task,
    id: (++boardState.cardIdIncrementer).toString(),
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
