const textarea = document.getElementById('textarea');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-button');

// Hent tidligere lagret data fra Local Storage
textarea.value = localStorage.getItem('notat');

// Lagre notatet i Local Storage når "Lagre" -knappen klikkes på
saveButton.addEventListener('click', function() {
  localStorage.setItem('notat', textarea.value);
  alert('Notatet ble lagret!');
});

// Slett notatet fra Local Storage og textarea når "Slett" -knappen klikkes på
clearButton.addEventListener('click', function() {
  localStorage.removeItem('notat');
  textarea.value = '';
  alert('Notatet ble slettet!');
});
