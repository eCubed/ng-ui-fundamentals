import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective implements AfterViewInit {
  @Input() draggableArea?: HTMLElement;

  private isDragging = false;
  private startX!: number;
  private startY!: number;
  private bounds!: { left: number; top: number; right: number; bottom: number };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.calculateBounds();
  }

  private calculateBounds(): void {
    if (this.draggableArea) {
      const padding = 0; // Adjust as needed
      this.bounds = {
        left: this.draggableArea.clientLeft,
        top: this.draggableArea.clientTop,
        right: this.draggableArea.clientLeft + this.draggableArea.clientWidth - this.el.nativeElement.clientWidth,
        bottom: this.draggableArea.clientTop + this.draggableArea.clientHeight - this.el.nativeElement.clientHeight
      };

      console.log(JSON.stringify(this.bounds))
      console.log(`draggable area height: ${this.draggableArea.clientHeight}`)
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX - this.el.nativeElement.offsetLeft;
    this.startY = event.clientY - this.el.nativeElement.offsetTop;
    this.renderer.addClass(this.el.nativeElement, 'dragging');
    console.log(`sx, sy: ${this.startX}, ${this.startY}`)
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      let offsetX = event.clientX - this.startX;
      let offsetY = event.clientY - this.startY;

      if (this.bounds) {
        offsetX = Math.max(this.bounds.left, Math.min(this.bounds.right, offsetX));
        offsetY = Math.max(this.bounds.top, Math.min(this.bounds.bottom, offsetY));
      }

      this.renderer.setStyle(this.el.nativeElement, 'left', offsetX + 'px');
      this.renderer.setStyle(this.el.nativeElement, 'top', offsetY + 'px');
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
  }

}
