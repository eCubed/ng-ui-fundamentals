import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggableItemHandle]',
  standalone: true
})
export class DraggableItemHandleDirective<T extends any> {

  @Input() dragData?: T | null;
  @Input() dragIndex?: number | null

  constructor(private el: ElementRef) {}


  @HostListener('mousedown', ['$event'])
  onMouseDown(_event: MouseEvent) {
    this.el.nativeElement.parentNode.setAttribute('draggable', 'true')
  }


  @HostListener('mouseup', ['$event'])
  onMouseUp(_event: MouseEvent) {
    this.el.nativeElement.parentNode.setAttribute('draggable', 'false')
  }

  /*
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.dataTransfer!.setData('application/json', JSON.stringify({ originalIndex: this.dragIndex, data: this.dragData }));
  }
  */

}
