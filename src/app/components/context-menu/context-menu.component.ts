import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/services/popup.service';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent<T> {

  @Input() items: Array<T> = []
  @Input() itemTemplate?: TemplateRef<T>
  @Input('selected-item') selectedItem?: T

  constructor(private popupRef: PopupRef) {}

  selectItem(item: T) {
    this.selectedItem = item
    this.popupRef.close(item)
  }
}
