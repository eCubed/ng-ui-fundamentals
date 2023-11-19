import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { PopupRef } from 'src/app/services/popup.service';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
  providers: [ClickOutsideDirective]
})
export class MyComponentComponent {

  constructor(private popupRef: PopupRef) {}

  close() {
    this.popupRef.close('Cloze string...')
  }
}
