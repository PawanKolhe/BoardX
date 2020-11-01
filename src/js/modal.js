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
        <form id="modalForm" class="modal__form">
          ${content}
        </form>
      </div>
      <div class="modal__actions">
        <button id="buttonCancel" class="action-button">Cancel</button>
        <button id="buttonSubmit" form="modalForm" class="action-button button-green">Add</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.toggle('noscroll', true);

  // Add Card button
  modal.querySelector('.modal__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const task = modal.querySelector('#inputValue').value;
    callback(task);
    removeModal(modal);
  });

  // Cancel button
  modal.querySelector('#buttonCancel').addEventListener('click', () => {
    removeModal(modal);
  });

  // Add Card button
  // modal.querySelector('#buttonSubmit').addEventListener('click', () => {
  //   const value = modal.querySelector('#inputValue').value;
  //   const valid = callback(value);
  //   if(valid) {
  //     removeModal(modal);
  //   }
  //   else if(valid === undefined) {
  //     console.error('No validation response from modal callback.');
  //     removeModal(modal);
  //   }
  //   else {
  //     return;
  //   }
  // });

  modal.querySelector('.modal__backdrop').addEventListener('click', () => {
    removeModal(modal);
  });
}

const removeModal = (modal) => {
  document.body.classList.toggle('noscroll', false);
  modal.remove();
}

const addCardModalHTML = `
  <div id="add-card-form">
    <div class="input-group">
      <label for="inputValue">Task</label>
      <input id="inputValue" type="text" required />
    </div>
  </div>
`;

const addListModalHTML = `
  <div id="add-list-form">
    <div class="input-group">
      <label for="inputValue">Name</label>
      <input id="inputValue" type="text" pattern="^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$" required />
    </div>
  </div>
`;

module.exports = {
  createModal,
  addCardModalHTML,
  addListModalHTML,
}
