import { Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appOverlayable]',
  standalone: true
})
export class OverlayableDirective implements AfterViewInit, OnChanges{

  @Input('show-overlay') showOverlay: boolean = false
  @Input('overlay-template') overlayTemplate?: TemplateRef<any>
  @Input('fade-duration') fadeDuration: number = 200

  overlayElement?: HTMLElement

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showOverlay'] && changes['showOverlay'].currentValue != null) {
      this.manageOverlay();
    }
  }

  private manageOverlay() {
    if (this.showOverlay) {
      if (this.overlayElement != undefined) {
        this.overlayElement.animate([ { opacity: 0}, { opacity: 1}], { duration: this.fadeDuration })
        document.body.appendChild(this.overlayElement)
      }
    } else {
      if (this.overlayElement != undefined) {
        this.overlayElement.animate([ { opacity: 1}, { opacity: 0}], { duration: this.fadeDuration })
        setTimeout(() => {
          document.body.removeChild(this.overlayElement!)
        }, this.fadeDuration - 50)
      }
    }
  }

  private resolveOverlayTemplate = (): HTMLElement => {
    if (this.overlayTemplate != undefined) {
      return this.overlayTemplate!.createEmbeddedView(null).rootNodes[0]
    }
    else {
      const theOneOnTopOfOverlay = document.createElement('div')
      theOneOnTopOfOverlay.innerHTML = 'Default Overlay'
      return theOneOnTopOfOverlay
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
    this.overlayElement.style.display= 'flex'
    this.overlayElement.style.justifyContent = 'center'
    this.overlayElement.style.alignItems = 'center'
    this.overlayElement.appendChild(this.resolveOverlayTemplate())

    this.manageOverlay()
  }

}
