import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'Label'; // Button text
  @Input() isDisabled: boolean = false;
  @Output() clicked = new EventEmitter<void>(); // Emit event on click

  handleClick() {
    this.clicked.emit();
  }
}
