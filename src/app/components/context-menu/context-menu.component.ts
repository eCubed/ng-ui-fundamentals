import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/services/popup.service';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss'
})
export class ContextMenuComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() items: Array<T> = []
  @Input() itemTemplate?: TemplateRef<T>
  @Input('selected-item') selectedItem?: T
  @Input('selected-color') selectedColor: string = ''

  constructor(private popupRef: PopupRef,
              private renderer: Renderer2,
              private elementRef: ElementRef) {}


  ngOnInit() {
    console.log(`at context menu component selected color is ${this.selectedColor}`)
    this.renderer.setStyle(this.elementRef.nativeElement, '--selected-color', this.selectedColor)
    console.log(`--- ${this.elementRef.nativeElement.style['--selected-color']}`)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedColor']) {
      console.log(`custom selected color: ${this.selectedColor}`)
      this.renderer.setStyle(this.elementRef.nativeElement, '--selected-color', this.selectedColor)
    }
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, '--selected-color', this.selectedColor)
  }

  selectItem(item: T) {
    this.selectedItem = item
    this.popupRef.close(item)
  }
}
