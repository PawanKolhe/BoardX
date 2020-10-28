import { renderList } from "./list";
import { renderCard } from "./card";

const renderBoard = (boardState) => {
  boardState.lists.forEach(list => {
    renderList(boardState, list);
    list.cards.forEach(card => {
      renderCard(list.id, card);
    });
  });
}

const loadBoardState = () => {
  return localStorage.getItem('boardState');
}

// const saveBoardState = (boardState) => {
//   localStorage.setItem('boardState', JSON.stringify(boardState));
// }

module.exports = {
  renderBoard,
  loadBoardState,
  // saveBoardState
}
