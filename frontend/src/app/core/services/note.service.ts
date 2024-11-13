import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../../shared/interfaces/note';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:5032/api';
  notes: Note[] = [];

  constructor(private http: HttpClient) {}

  getNotes(userId: number) {
    return this.http.get<Note[]>(`${this.apiUrl}/notes/${userId}`).pipe(
      tap((notes) => {
        this.notes = notes;
      })
    );
  }

  createNote(newNote: Note) {
    return this.http.post<Note>(`${this.apiUrl}/notes`, newNote).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  updateNote(note: Note) {
    return this.http.put(`${this.apiUrl}/notes`, note).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
