


const notesPage = document.querySelector('#notes-page');
const noteInput = document.querySelector('#note-input');
const saveNoteBtn = document.querySelector('#save-note-btn');
const notesList = document.querySelector('#notes-list');

// Vis notatsiden når du klikker på notatlenken
document.querySelector('#notes-link').addEventListener('click', function(event) {
  event.preventDefault();
  showPage(notesPage);
});

// Hent notatene fra Local Storage og vis dem
function showNotes() {
  notesList.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('note-')) {
      const note = localStorage.getItem(key);
      const noteElem = document.createElement('div');
      noteElem.textContent = note;
      notesList.appendChild(noteElem);
    }
  }
}

// Lagre notatet i Local Storage og vis notatene
saveNoteBtn.addEventListener('click', function() {
  const note = noteInput.value.trim();
  if (note !== '') {
    const key = `note-${Date.now()}`;
    localStorage.setItem(key, note);
    noteInput.value = '';
    showNotes();
  }
});

// Vis notatene når siden lastes inn
showNotes();


function saveNote() {
  var note = document.getElementById("note-input").value;
  if (note !== "") {
    var notesList = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
    notesList.push(note);
    localStorage.setItem("notes", JSON.stringify(notesList));
    document.getElementById("note-input").value = "";
    showNotes();
  }
}

function showNotes() {
  var notesList = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
  var notesListHTML = "";
  if (notesList.length > 0) {
    notesListHTML += "<ul>";
    for (var i = 0; i < notesList.length; i++) {
      notesListHTML += "<li>" + notesList[i] + "</li>";
    }
    notesListHTML += "</ul>";
  } else {
    notesListHTML = "Ingen notater lagret ennå.";
  }
  document.getElementById("notes-list").innerHTML = notesListHTML;
}

document.getElementById("save-note-btn").addEventListener("click", saveNote);

window.onload = function() {
  showNotes();
};

