const todoBoard = document.querySelector('#todoBoard .board__draggable');
const inprogressBoard = document.querySelector('#inprogressBoard .board__draggable');
const codereviewBoard = document.querySelector('#codereviewBoard .board__draggable');
const doneBoard = document.querySelector('#doneBoard .board__draggable');

dragula([todoBoard, inprogressBoard, codereviewBoard, doneBoard]);
