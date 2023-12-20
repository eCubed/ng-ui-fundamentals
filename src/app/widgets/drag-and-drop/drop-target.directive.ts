import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDropTarget]',
  standalone: true
})
export class DropTargetDirective<T extends any> {

  @Input() canDropCallback?: (data?: T | null) => boolean | null

  @Output() dropped: EventEmitter<T> = new EventEmitter<T>(); // Emit the drop index

  constructor(protected el: ElementRef) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    const data: T | null = JSON.parse(event.dataTransfer!.getData('application/json')) as T
    if (this.canDropCallback?.(data) ?? true) {
      event.preventDefault(); // Allow drop

      // do manipulation or feedback
      this.el.nativeElement.classList.add('can-drop')
      this.el.nativeElement.classList.remove('cannot-drop')
    } else {
      this.el.nativeElement.classList.remove('can-drop')
      this.el.nativeElement.classList.add('cannot-drop')
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    this.el.nativeElement.classList.remove('can-drop')
    this.el.nativeElement.classList.remove('cannot-drop')
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();

    const data: T | null = JSON.parse(event.dataTransfer!.getData('application/json')) as T
    this.dropped.emit(data);
    this.el.nativeElement.classList.remove('can-drop')
    this.el.nativeElement.classList.remove('cannot-drop')
  }



}
