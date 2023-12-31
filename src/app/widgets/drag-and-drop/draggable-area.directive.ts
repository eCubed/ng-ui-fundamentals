import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggableArea]',
  standalone: true
})
export class DraggableAreaDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(el.nativeElement, 'box-sizing', 'border-box');
    this.renderer.setStyle(el.nativeElement, 'background-color', '#eeeeee')
    this.renderer.setStyle(el.nativeElement, 'height', '300px');
  }

}
