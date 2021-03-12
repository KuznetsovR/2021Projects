import { Note } from "../shared/note.js";
import { Observable } from '../shared/observable.js'

export class NotesModel {
  constructor(notes = [], apiService) {
    this.notes = notes;
    this.apiService = apiService;
    this.currentId =
      notes.reduce((max, note) => (note.id > max ? note.id : max), 0) + 1;
    this.onAdd = new Observable();
    this.onEdit = new Observable();
    this.onRemove = new Observable();
    this.onSet = new Observable();
    this.loadingStatus = new Observable(false);
  }
  loadNotes() {
    this.setLoadingStatus(true);
    this.apiService.getNotes().then((notes) => {
      this.setNotes(notes);
      this.setLoadingStatus(false);
    });
  }
   
  //////////////////////////////изменение данных и вызов(оповещение) функций(подписок)
  setLoadingStatus(status) {
    this.loadingStatus.next(status)
  }
  setNotes(notes) {
    this.notes = notes;
    this.currentId =
      notes.reduce((max, note) => (note.id > max ? note.id : max), 0) + 1;
    this.onSet.next(notes)
  }

  addNote(heading, content) {                         //todo: no empty content heading
    if (heading == undefined || heading == '' || content == undefined || content == '') return
    this.setLoadingStatus(true);
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        ["Content-type"]: "application/json",
      },
      body: JSON.stringify({
        heading,
        content,
      }),
    })
      .then((res) => res.text())          //перенести в апи
      .then((id) => {
        const note = new Note(+id, heading, content);
        this.notes.push(note);
        this.onAdd.next(note)

        this.setLoadingStatus(false);
      });
  }
  editNote(note) {
    const i = this.notes.findIndex((n) => note.id === n.id);
    const heading = note.heading
    const content = note.content
    if (i !== -1) {
      fetch(`http://localhost:3000/notes/${note.id}`, {
        method: "PUT",
        headers: {
          ["Content-type"]: "application/json",
        },
        body: JSON.stringify({
          heading,
          content,
        }),
      })
        .then((res) => res.text())
        .then(() => {
          this.notes.splice(i, 1, note);
          this.onEdit.next(note)
          this.setLoadingStatus(false);
        });
    }
  }
  removeNote(note) {
    this.setLoadingStatus(true);
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "DELETE",
      headers: {
        ["Content-type"]: "application/json",
      },
    })
      .then((res) => res.text())
      .then(() => {
        this.notes.splice(note.id, 1);
        this.onRemove.next(note)
        this.setLoadingStatus(false);
      });
  }
  //////////////////////////////////
  getNoteById(id) {
    return this.notes.find((n) => n.id === id);
  }
}
