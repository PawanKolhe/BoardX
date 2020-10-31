const generateListId = (text) => text.toLowerCase().replaceAll(' ', '-');

const encodeHTML = (s) => {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

module.exports = {
  generateListId,
  encodeHTML
}
