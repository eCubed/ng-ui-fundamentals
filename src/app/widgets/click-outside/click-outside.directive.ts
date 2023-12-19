import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

  @Output() clickedOutside: EventEmitter<null> = new EventEmitter<null>()

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.documentClickHandler)
  }

  documentClickHandler = (e: MouseEvent) => {
    if (!this.elementRef.nativeElement.contains(e.target)) {
      console.log('Clicked outside')
      this.clickedOutside.emit()
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickHandler)
  }

}
