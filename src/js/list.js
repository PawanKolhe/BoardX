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
        <img src="./assets/menu-dots.svg" alt="menu" />
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
  const listMenu = document.createElement('div');
  listMenu.className = 'list__menu';
  listMenu.innerHTML = `
    <div class="list__menu-option list__menu-option-red" data-action="delete">Delete</div>
  `;
  listMenu.querySelector('.list__menu-option[data-action="delete"]').addEventListener('click', (e) => {
    removeList(list, id);
  });
  tippy(list.querySelector(`.list__menu-button`), {
    content: listMenu,
    allowHTML: true,
    placement: 'bottom-end',
    trigger: 'click',
    interactive: true,
    theme: 'light',
  });
  return list;
}

const addListToListsOrderState = (listId) => {
  let listsOrderState = localStorage.getItem('lists');
  listsOrderState = `${listsOrderState}|${listId}`;
  localStorage.setItem('lists', listsOrderState);
}

const removeListFromListsOrderState = (listId) => {
  let listsOrderState = localStorage.getItem('lists');
  listsOrderState = listsOrderState.replace(listId, '');
  listsOrderState = listsOrderState.replace('||', '|');
  if(listsOrderState.charAt(0) === '|') {
    listsOrderState = listsOrderState.substring(1);
  }
  if(listsOrderState.charAt(listsOrderState.length - 1) === '|') {
    listsOrderState = listsOrderState.substring(0, listsOrderState.length - 1);
  }
  localStorage.setItem('lists', listsOrderState);
}

const removeList = (listElement, listId) => {
  listElement.remove();
  const listIndex = boardState.lists.findIndex(list => list.id === listId);
  const deleteCardCount = boardState.lists[listIndex].cards.length;
  boardState.cardCount -= deleteCardCount;
  boardState.lists.splice(listIndex, 1);
  console.log(JSON.stringify(boardState, null, 2));
  // Save board state
  localStorage.setItem('boardState', JSON.stringify(boardState));
  removeListFromListsOrderState(listId);
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
  addListToListsOrderState(id);
}

module.exports = {
  getListHTML,
  renderList,
  createList
}
