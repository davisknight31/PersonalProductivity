import { Component } from '@angular/core';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../core/services/note.service';
import { Note } from '../../shared/interfaces/note';

@Component({
  selector: 'app-edit-notes',
  standalone: true,
  imports: [TextEditorComponent, CommonModule],
  templateUrl: './edit-notes.component.html',
  styleUrl: './edit-notes.component.scss',
})
export class EditNotesComponent {
  selectedNote!: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('noteId');

    if (noteId) {
      const foundNote = this.noteService.notes.find(
        (note) => note.id === parseInt(noteId)
      );

      if (foundNote) {
        this.selectedNote = foundNote;
      }
    }
  }

  handleSaveAction(content: string) {
    this.selectedNote.content = content;
    this.noteService.updateNote(this.selectedNote).subscribe({
      next: () => {
        console.log('maybe refresh notes?');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  handleSaveNewName(newName: string) {
    this.selectedNote.name = newName;
    this.noteService.updateNote(this.selectedNote).subscribe({
      next: () => {
        console.log('maybe refresh notes?');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
