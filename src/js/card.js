const createCard = (task) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card__text">${task}</div>
  `;
  card.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
  return card;
}

module.exports = {
  createCard
}
