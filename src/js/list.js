import { generateListId } from "./utils";
import { createModal, addCardModalHTML } from "./modal";
import { createCard } from "./card";
import tippy from 'tippy.js';

const getListHTML = ({ name, id }) => {
  const list = document.createElement('div');
  list.className = 'list';
  list.setAttribute('data-id', id);
  list.innerHTML = `
    <div class="list__header">
      <div class="list__title">${name}</div>
      <div class="list__menu-button">
        <img src="./assets/menu-dots.svg" alt="drag" />
      </div>
    </div>
    <div id="${id}" class="list__draggable"></div>
    <div class="list__add-card-button">
      <i class="fas fa-plus"></i>
      <div class="list__add-card-button-text">Add Card</div>
    </div>
  `;
  list.querySelector('.list__title').addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  list.querySelector('.list__add-card-button').addEventListener('click', (e) => {
    createModal('Add Card', addCardModalHTML, (task) => {
      createCard(name, task);
    });
  });
  tippy(list.querySelector(`.list__menu-button`), {
    content: `
      <div class="list__menu">
        <div class="list__menu-option list__menu-option-red">Delete</div>
      </div>
    `,
    allowHTML: true,
    placement: 'bottom-end',
    trigger: 'click',
    interactive: true,
    theme: 'light',
  });
  return list;
}

const renderList = (list) => {
  const listHTML = getListHTML(list);
  document.querySelector('#listsContainer').appendChild(listHTML);
}

const createList = (name) => {
  const id = generateListId(name);
  const found = boardState.lists.find(list => list.id === id);
  if(found) {
    console.error('List name already exists.');
    return;
  }
  const list = {
    name,
    id,
    cards: []
  };
  boardState.lists.push(list);
  renderList(list);
  // Save board state
  localStorage.setItem('boardState', JSON.stringify(boardState));
}

module.exports = {
  getListHTML,
  renderList,
  createList
}
