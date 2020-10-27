import { boardState } from "./boardState";
import { generateListId } from "./utils";
import { createModal, addCardModalHTML } from "./modal";
import { createCard } from "./card";

const getListHTML = ({ name, id }) => {
  const list = document.createElement('div');
  list.className = 'list';
  list.id = `listID-${id}`;
  list.innerHTML = `
    <div class="list__header">
      <div class="list__title">${name}</div>
      <img class="list__drag" src="./assets/drag-dots.svg" alt="drag" />
    </div>
    <div class="list__draggable"></div>
    <div class="list__add-card-button">
      <i class="fas fa-plus"></i>
      <div class="list__add-card-button-text">Add Card</div>
    </div>
  `;
  list.querySelector('.list__drag').addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  list.querySelector('.list__add-card-button').addEventListener('click', (e) => {
    createModal('Add Card', addCardModalHTML, (task) => {
      createCard(boardState, name, task);
    });
  });
  return list;
}

const createList = (boardState, name) => {
  const id = generateListId(name);
  const found = boardState.lists.find(list => list.id === id);
  if(found) {
    return;
  }
  const list = {
    name,
    id,
    cards: []
  };
  boardState.lists.push(list);
  const listHTML = getListHTML(list);
  document.querySelector('#listsContainer').appendChild(listHTML);
}

module.exports = {
  getListHTML,
  createList
}
