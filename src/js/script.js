import { createModal } from "./modal";

// Boards
const todoBoard = document.querySelector('#todoBoard .board__draggable');
const inprogressBoard = document.querySelector('#inprogressBoard .board__draggable');
const codereviewBoard = document.querySelector('#codereviewBoard .board__draggable');
const doneBoard = document.querySelector('#doneBoard .board__draggable');

// Make boards draggable
dragula([todoBoard, inprogressBoard, codereviewBoard, doneBoard]);

// Add Card
const addCard = document.querySelector('#addCard');
addCard.addEventListener('click', (e) => {
  createModal('Add Card', (task) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__text">${task}</div>
    `;
    card.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });

    todoBoard.appendChild(card);
  });
});
