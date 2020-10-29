const createModal = (title, content, callback) => {
  const modal = document.createElement('div');
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
    removeModal(modal);
  });

  // Add Card button
  modal.querySelector('#buttonAddCard').addEventListener('click', () => {
    const task = modal.querySelector('#inputValue').value;
    callback(task);
    removeModal(modal);
  });

  modal.querySelector('.modal__backdrop').addEventListener('click', () => {
    removeModal(modal);
  });
}

const removeModal = (modal) => {
  document.body.classList.toggle('noscroll', false);
  modal.remove();
}

const addCardModalHTML = `
  <div id="add-form">
    <div class="input-group">
      <label for="inputValue">Task</label>
      <input id="inputValue" type="text" />
    </div>
  </div>
`;

const addListModalHTML = `
  <div id="add-form">
    <div class="input-group">
      <label for="inputValue">Name</label>
      <input id="inputValue" type="text" pattern="[_a-zA-Z]+[_a-zA-Z0-9-]*" />
    </div>
  </div>
`;

module.exports = {
  createModal,
  addCardModalHTML,
  addListModalHTML,
}
