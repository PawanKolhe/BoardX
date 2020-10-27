import { boardState } from "./boardState";
import { createModal, addCardModalHTML, addListModalHTML } from "./modal";
import { createList } from "./list";
import { createCard } from "./card";

// Add sample boards
createList(boardState, 'To Do');
createList(boardState, 'In Progress');
createList(boardState, 'Done');

// Add sample card
createCard(boardState, 'To Do', 'Sample Task');

// Make boards draggable
const dragulaLists = dragula([document.querySelector('#listsContainer')], {
  direction: 'horizontal',
  moves: (el, source, handle, sibling) => {
    if(handle.classList.contains('list__drag')) {
      return true;
    } else {
      return false;
    }
  }
});

// Make cards draggable
const dragulaCards = dragula({
  direction: 'vertical',
  slideFactorX: 7,
  slideFactorY: 7,
  isContainer: function (el) {
    return el.classList.contains('list__draggable');
  }
});

// Add Card handler
document.querySelector('#addCardButton').addEventListener('click', (e) => {
  createModal('Add Card', addCardModalHTML, (task) => {
    document.querySelector('#listsContainer').firstChild.querySelector('.list__draggable').appendChild(createCard(task));
  });
});

// Add Board handler
document.querySelector('#addListButton').addEventListener('click', (e) => {
  createModal('Add List', addListModalHTML, (name) => {
    createList(boardState, name);
  });
});
