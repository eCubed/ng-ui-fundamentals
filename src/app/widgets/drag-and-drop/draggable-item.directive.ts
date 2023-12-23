import { ContentChild, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DraggableItemHandleDirective } from './draggable-item-handle.directive';

@Directive({
  selector: '[appDraggableItem]',
  standalone: true
})
export class DraggableItemDirective<T extends any> {

  @Input() dragData?: T | null;
  @Input() dragIndex?: number | null

  @ContentChild(DraggableItemHandleDirective<T>) draggableItemHandle?: DraggableItemHandleDirective<T>

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(_event: MouseEvent) {

     if (this.draggableItemHandle == null)
      this.el.nativeElement.setAttribute('draggable', 'true')

  }

  @HostListener('mouseup', ['event'])
  onMouseUp(_event: MouseEvent) {
    this.el.nativeElement.setAttribute('draggable', 'false')
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.dataTransfer!.setData('application/json', JSON.stringify({ originalIndex: this.dragIndex, data: this.dragData }));
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(_event: DragEvent): void {
    this.el.nativeElement.setAttribute('draggable', 'false')
  }

}
