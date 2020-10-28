import { renderBoard } from "./board";
import { createModal, addListModalHTML } from "./modal";
import { createList } from "./list";
import { createCard } from "./card";
import { Sortable } from "sortablejs";

let boardState = localStorage.getItem('boardState');
if(boardState) {
  boardState = JSON.parse(boardState);
  renderBoard(boardState);
} else {
  boardState =  {
    lists: [],
    cardCount: 0,
  };

  // Add sample boards
  createList(boardState, 'To Do');
  createList(boardState, 'In Progress');
  createList(boardState, 'Done');

  // Add sample card
  createCard(boardState, 'To Do', 'Sample Task');
}

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
  dataIdAttr: 'data-id',
  setData: function (dataTransfer, dragEl) {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    dataTransfer.setDragImage(img, 0, 0);
  },
  store: {
    get: function (sortable) {
      let order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split("|") : [];
    },
    set: function (sortable) {
      let order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join("|"));
    },
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
dragulaCards.on("drop", (el, target, source, sibling) => {
  const cardID = el.id;
  const fromListID = source.id;
  const toListID = target.id;
  const fromList = boardState.lists.find(list => list.id === fromListID);
  const toList = boardState.lists.find(list => list.id === toListID);
  const fromCardIndex = fromList.cards.findIndex(card => card.id === cardID);
  const card = fromList.cards[fromCardIndex];
  console.log('Before', JSON.stringify(boardState, null, 2));
  // Remove card from source list
  if(fromCardIndex !== -1) {
    fromList.cards.splice(fromCardIndex, 1);
  } else {
    console.error('Remove card from source list error.');
    return;
  }
  // Find and add card to target list
  let toCardIndex;
  for(let i = 0; i < target.childElementCount; i++) {
    if(target.children.item(i).id === cardID) {
      toCardIndex = i;
      break;
    }
  }
  if(toCardIndex !== undefined) {
    toList.cards.splice(toCardIndex, 0, card);
  } else {
    console.error('Add card to target list error.');
    return;
  }
  console.log('After', JSON.stringify(boardState, null, 2));
  // Save board state
  localStorage.setItem('boardState', JSON.stringify(boardState));
});

// Add List handler
document.querySelector('#addListButton').addEventListener('click', (e) => {
  createModal('Add List', addListModalHTML, (name) => {
    createList(boardState, name);
  });
});
