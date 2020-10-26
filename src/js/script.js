import { createModal } from "./modal";
import { createBoard } from "./board";
import { createCard } from "./card";

// Boards
const boards = document.querySelector('.boards');

// Add sample boards
boards.appendChild(createBoard('To Do'));
boards.appendChild(createBoard('In Progress'));
boards.appendChild(createBoard('Done'));

// Create sample card
boards.firstChild.querySelector('.board__draggable').appendChild(createCard('Sample Task'));

// Make boards draggable
const dragulaBoards = dragula([boards], {
  direction: 'horizontal',
  moves: (el, source, handle, sibling) => {
    if(handle.classList.contains('card') || handle.classList.contains('card__text')) {
      return false;
    } else {
      return true;
    }
  }
});

// Make cards draggable
const dragulaCards = dragula({
  direction: 'vertical',
  isContainer: function (el) {
    return el.classList.contains('board__draggable');
  }
});

// Add Card handler
document.querySelector('#addCard').addEventListener('click', (e) => {
  createModal('Add Card', (task) => {
    boards.firstChild.querySelector('.board__draggable').appendChild(createCard(task));
  });
});

// Add Board handler
document.querySelector('#addBoard').addEventListener('click', (e) => {
  createModal('Add Board', (name) => {
    boards.appendChild(createBoard(name));
  });
});
