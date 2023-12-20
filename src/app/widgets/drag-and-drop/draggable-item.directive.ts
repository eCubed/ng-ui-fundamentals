import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableItem]',
  standalone: true
})
export class DraggableItemDirective<T extends any> implements AfterViewInit{

  @Input() dragData?: T | null;
  @Input() dragIndex?: number | null

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setProperty(this.el.nativeElement, 'draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.dataTransfer!.setData('application/json', JSON.stringify({ originalIndex: this.dragIndex, data: this.dragData }));
  }

}
