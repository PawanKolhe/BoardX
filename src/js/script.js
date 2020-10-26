import { createModal } from "./modal";
import { createList } from "./board";
import { createCard } from "./card";

// State
const boardState = {};

// Boards
const lists = document.querySelector('.lists');

// Add sample boards
lists.appendChild(createList('To Do'));
lists.appendChild(createList('In Progress'));
lists.appendChild(createList('Done'));

// Create sample card
lists.firstChild.querySelector('.list__draggable').appendChild(createCard('Sample Task'));

// Make boards draggable
const dragulaLists = dragula([lists], {
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
document.querySelector('#addCard').addEventListener('click', (e) => {
  const modalHTML = `
    <div id="add-form">
      <div class="input-group">
        <label for="inputValue">Task</label>
        <input id="inputValue" type="text" />
        <!--<textarea id="cardText" cols="35" rows="5"></textarea>-->
      </div>
    </div>
  `;
  createModal('Add Card', modalHTML, (task) => {
    lists.firstChild.querySelector('.list__draggable').appendChild(createCard(task));
  });
});

// Add Board handler
document.querySelector('#addList').addEventListener('click', (e) => {
  const modalHTML = `
    <div id="add-form">
      <div class="input-group">
        <label for="inputValue">Name</label>
        <input id="inputValue" type="text" />
      </div>
    </div>
  `;
  createModal('Add List', modalHTML, (name) => {
    lists.appendChild(createList(name));
  });
});
