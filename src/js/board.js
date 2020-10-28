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

module.exports = {
  renderBoard
}
