import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/services/popup.service';

@Component({
  selector: 'app-prompt-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-dialog.component.html',
  styleUrl: './prompt-dialog.component.scss'
})
export class PromptDialogComponent {
  @Input() question: string = "Are you sure?"

  constructor(private popupRef: PopupRef) {}

  yes() {
    this.popupRef.close('Yes')
  }

  no() {
    this.popupRef.close()
  }
}