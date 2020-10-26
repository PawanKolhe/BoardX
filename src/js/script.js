import { createModal } from "./modal";
import { createBoard } from "./board";
import { createCard } from "./card";

// State
const boardState = {};

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
    if(handle.classList.contains('board__drag')) {
      return true;
    } else {
      return false;
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
  const modalHTML = `
    <div id="add-form">
      <div class="input-group">
        <label for="cardText">Task</label>
        <textarea id="cardText" cols="30" rows="5"></textarea>
      </div>
    </div>
  `;
  createModal('Add Card', modalHTML, (task) => {
    boards.firstChild.querySelector('.board__draggable').appendChild(createCard(task));
  });
});

// Add Board handler
document.querySelector('#addBoard').addEventListener('click', (e) => {
  const modalHTML = `
    <div id="add-form">
      <div class="input-group">
        <label for="cardText">Name</label>
        <textarea id="cardText" cols="30" rows="5"></textarea>
      </div>
    </div>
  `;
  createModal('Add Board', modalHTML, (name) => {
    boards.appendChild(createBoard(name));
  });
});
