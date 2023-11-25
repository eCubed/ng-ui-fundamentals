import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, TemplateRef } from '@angular/core';
import { PopupRef, PopupService } from 'src/app/services/popup.service';
import { ContextMenuComponent } from './context-menu.component';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';

@Directive({
  selector: '[appContextMenu]',
  standalone: true,
  providers: [ClickOutsideDirective]
})
export class ContextMenuDirective<T> {

  @Input() items: Array<T> = []
  @Input() itemTemplate?: TemplateRef<T>
  @Output() itemSelected: EventEmitter<T> = new EventEmitter<T>()
  @Input('selected-color') selectedColor: string = ''

  popupRef!: PopupRef
  isPopupShowing = false
  selectedItem?: T

  constructor(private elementRef: ElementRef,
              private popupService: PopupService,
              private renderer: Renderer2) { }

  openPopup() {
    const { x, y, height, width } = this.elementRef.nativeElement.getBoundingClientRect()
    console.log(`at context menu directive, the custom selected color is ${this.selectedColor}`)
    this.popupRef = this.popupService.open(
      ContextMenuComponent,
      { absoluteX: x, absoluteY: y + height },
      ( contextMenuInstance: ContextMenuComponent<T>) => {
        contextMenuInstance.items = this.items
        contextMenuInstance.selectedItem = this.selectedItem
        contextMenuInstance.itemTemplate = this.itemTemplate
        contextMenuInstance.selectedColor = this.selectedColor
      },
      (componentElement: HTMLElement) => {
        this.renderer.setStyle(componentElement, 'width', `${ (width < 100) ? 100 : width }px`)
        //this.renderer.setStyle(componentElement.firstChild, 'width', `${ (width < 100) ? 100 : width }px`)
        //this.renderer.setStyle(componentElement.firstChild, 'background-color', '#cccccc')
      }
    )

    this.isPopupShowing = true

    this.popupRef.onClose = (selectedItem?: T) => {
      if (selectedItem != null) {

        this.selectedItem = selectedItem
        this.itemSelected.emit(selectedItem)
      }

      this.isPopupShowing = false
    }
  }

  @HostListener('click')
  click() {
    console.log(`popup showing right when clicked: ${this.isPopupShowing}`)
    if (this.isPopupShowing) {
      this.popupRef?.close()
      this.isPopupShowing = false
    } else {
      this.openPopup()
      this.isPopupShowing = true
    }
  }

}
