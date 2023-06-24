import { Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOverlayable]',
  standalone: true
})
export class OverlayableDirective implements AfterViewInit, OnChanges{

  @Input('show-overlay') showOverlay: boolean = false

  overlayElement?: HTMLElement

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showOverlay'] && changes['showOverlay'].currentValue != null) {
      console.log('ngonchanges overlay')
      console.log(`applying overlay: ${this.showOverlay}`)
      if (this.showOverlay) {

        if (this.overlayElement != undefined)
          document.appendChild(this.overlayElement)
      } else {
        console.log('removing overlay')
        if (this.overlayElement != undefined)
          document.removeChild(this.overlayElement!)
      }

    }
  }

  ngAfterViewInit(): void {
    console.log('Creating overlay')
    const { width, height, top, left } = this.elementRef.nativeElement.getBoundingClientRect()
    this.overlayElement = document.createElement('div')
    this.overlayElement.style.position = 'absolute'
    this.overlayElement.style.width = `${width}px`
    this.overlayElement.style.height = `${height}px`
    this.overlayElement.style.left = `${left + window.scrollX}px`
    this.overlayElement.style.top = `${top + window.scrollY}px`
    this.overlayElement.style.backgroundColor = "#cccccc77"

  }

}
