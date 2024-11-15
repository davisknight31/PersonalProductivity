import { Component, EventEmitter, Input, Output } from '@angular/core';
import Quill from 'quill';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent {
  @Input() semanticHtmlContent: string = '';
  @Input() noteName: string = '';
  @Output() saveEmitter = new EventEmitter<string>();
  @Output() saveNewNoteNameEmitter = new EventEmitter<string>();

  quill!: Quill;
  hideNoteNameInput: boolean = true;
  showSavedText: boolean = false;

  // toolbarOptions = [
  //   [{ size: ['small', false, 'large', 'huge'] }],
  //   [{ font: [] }],
  //   [{ header: [1, 2, 3, 4] }],
  //   [{ indent: '-1' }, { indent: '+1' }],
  //   ['bold', 'italic', 'underline', 'strike', 'code-block'],
  //   ['link', 'image', 'video'],
  //   [{ color: [] }, { background: [] }],
  //   [{ align: [] }],
  //   ['clean'],
  // ];

  ngOnInit() {
    this.quill = new Quill('.editor', {
      theme: 'snow',
      modules: {
        toolbar: { container: '#toolbar' },
      },
    });

    if (this.semanticHtmlContent.length <= 0) {
      //if this is a new document, i.e. not saved data is pulled,
      //then set the editor to empty
      this.quill.clipboard.dangerouslyPasteHTML('');
    } else {
      //other wise load the html
      this.load();
    }
  }

  load() {
    this.quill.clipboard.dangerouslyPasteHTML(this.semanticHtmlContent);
  }

  save() {
    this.showSavedText = true;
    this.saveEmitter.emit(this.quill.getSemanticHTML());
    setTimeout(() => {
      this.showSavedText = false;
    }, 2000);
  }

  export() {
    console.log('export');
  }

  saveNewNoteName() {
    this.hideNoteNameInput = !this.hideNoteNameInput;
    this.saveNewNoteNameEmitter.emit(this.noteName);
  }
}
