import { ApplicationRef, Directive, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements AfterViewInit {
  @Input() appTooltip: string = 'Default tooltip'
  @Input('fade-duration') fadeDuration: number = 500

  tooltipElement?: HTMLElement
  topCoordinateOfTooltip: number = 0

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.tooltipElement != undefined) {
      document.body.appendChild(this.tooltipElement)
      this.tooltipElement.animate([ { opacity: 0}, { opacity: 1}], { duration: this.fadeDuration })
      const { top: elementRefTop } = this.elementRef.nativeElement.getBoundingClientRect()
      this.tooltipElement.style.top = `${elementRefTop - this.tooltipElement.clientHeight}px`
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (this.tooltipElement != undefined) {
      this.tooltipElement.animate([ { opacity: 1}, { opacity: 0}], { duration: this.fadeDuration })
      setTimeout(() => {
        document.body.removeChild(this.tooltipElement!)
      }, this.fadeDuration - 50)
    }
  }

  ngAfterViewInit(): void {
    const { top, left } = this.elementRef.nativeElement.getBoundingClientRect()
    this.tooltipElement = document.createElement('div')
    this.tooltipElement.style.position = 'absolute'
    this.tooltipElement.style.boxSizing = 'border-box'
    this.tooltipElement.style.padding = '0.25em'
    this.tooltipElement.style.left = `${left + window.scrollX}px`
    this.tooltipElement.style.top = `${top + window.scrollY}px`
    this.tooltipElement.style.backgroundColor = '#101010'
    this.tooltipElement.innerHTML = this.appTooltip
    this.tooltipElement.style.color = '#eeeeee'
  }



}
