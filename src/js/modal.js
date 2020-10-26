let modal;

const createModal = (title, content, callback) => {
  modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__title">${title}</div>
      </div>
      <div class="modal__info">
        ${content}
      </div>
      <div class="modal__actions">
        <button id="buttonCancel" class="action-button">Cancel</button>
        <button id="buttonAddCard" class="action-button button-green">Add</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.toggle('noscroll', true);

  // Cancel button
  modal.querySelector('#buttonCancel').addEventListener('click', () => {
    removeModal();
  });

  // Add Card button
  modal.querySelector('#buttonAddCard').addEventListener('click', () => {
    const task = modal.querySelector('#inputValue').value;
    callback(task);
    removeModal();
  });
}

const removeModal = () => {
  document.body.classList.toggle('noscroll', false);
  modal.remove();
}

module.exports = {
  createModal
}
