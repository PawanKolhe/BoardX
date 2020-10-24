let modal;

const createModal = (title, callback) => {
  modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__title">${title}</div>
      </div>
      <div class="modal__info">
        <div id="add-form">
          <div class="input-group">
            <label for="cardText">Task</label>
            <textarea id="cardText" cols="30" rows="5"></textarea>
          </div>
        </div>
      </div>
      <div class="modal__actions">
        <button id="buttonCancel" class="action-button">Cancel</button>
        <button id="buttonAddCard" class="action-button button-green">Add</button>
      </div>
    </div>
  `;

  const body = document.querySelector('body');
  body.appendChild(modal);

  // Cancel button
  modal.querySelector('#buttonCancel').addEventListener('click', () => {
    modal.remove();
  });

  // Add Card button
  modal.querySelector('#buttonAddCard').addEventListener('click', () => {
    const task = modal.querySelector('#cardText').value;
    callback(task);
    modal.remove();
  });
}

module.exports = {
  createModal
}
