import { boardState } from "./boardState";
import { createModal, addListModalHTML } from "./modal";
import { createList } from "./list";
import { createCard } from "./card";
import { Sortable } from "sortablejs";

// Add sample boards
createList(boardState, 'To Do');
createList(boardState, 'In Progress');
createList(boardState, 'Done');

// Add sample card
createCard(boardState, 'To Do', 'Sample Task');

// Make boards draggable
// const dragulaLists = dragula([document.querySelector('#listsContainer')], {
//   direction: 'horizontal',
//   moves: (el, source, handle, sibling) => {
//     if(handle.classList.contains('list__drag')) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// });
const listsContainer = document.querySelector('#listsContainer');
const draggableLists = new Sortable(listsContainer, {
  draggable: '.list',
  handle: '.list__drag',
  animation: 150,
  setData: function (dataTransfer, dragEl) {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    dataTransfer.setDragImage(img, 0, 0);
  },
});

// Make cards draggable
const dragulaCards = dragula({
  direction: 'vertical',
  slideFactorX: 7,
  slideFactorY: 7,
  delay: 1000,
  delayOnTouchOnly: true,
  isContainer: function (el) {
    return el.classList.contains('list__draggable');
  }
});

// Add Board handler
document.querySelector('#addListButton').addEventListener('click', (e) => {
  createModal('Add List', addListModalHTML, (name) => {
    createList(boardState, name);
  });
});
