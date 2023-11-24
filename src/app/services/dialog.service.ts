import { Injectable, Renderer2, RendererFactory2, Type } from '@angular/core';
import { PopupRef, PopupService } from './popup.service';

export class DialogRef {
  close!: (value?: any | null) => void
  onClose?: (value?: any | null) => void
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  popupRef!: PopupRef
  dialogRef!: DialogRef

  overlay?: HTMLDivElement
  renderer!: Renderer2

  constructor(
    private popupService: PopupService,
    private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  private createDialogOverlay(): HTMLDivElement {
    const overlay = document.createElement('div')
    this.renderer.setStyle(overlay, 'position', 'absolute')
    this.renderer.setStyle(overlay, 'width', '100vw')
    this.renderer.setStyle(overlay, 'height', '100vh')
    this.renderer.setStyle(overlay, 'left', '0')
    this.renderer.setStyle(overlay, 'top', '0')
    this.renderer.setStyle(overlay, 'right', '0')
    this.renderer.setStyle(overlay, 'bottom', '0')
    this.renderer.setStyle(overlay, 'background-color', '#33333333')
    return overlay
  }

  open<C extends any>(
    componentType: Type<C>,
    supplyParameters?: (componentInstance: C) => void,
    setStyles?: (componentElement: HTMLElement) => void,
    ): DialogRef {

    // Set up the dialog ref first.
    this.dialogRef = {
      close: (value?: any | null) => {
        if (this.popupRef != null) {
          this.dialogRef.onClose?.(value)
        }
      }
    }

    // Then plop the overlay
    this.overlay = this.createDialogOverlay()
    this.overlay.animate([ { opacity: 0}, { opacity: 1}], { duration: 250 })
    document.body.appendChild(this.overlay)

    this.overlay.addEventListener('click', () => {
      /*
      this.overlay!.animate([ { opacity: 1}, { opacity: 0}], { duration: 250 })
      setTimeout(() => {
        document.body.removeChild(this.overlay!)
      }, 200)
      */
      this.dialogRef.close()
    })

    // We'll need to calculate the x and y coordinate!?
    //const { width: documentWidth, height: documentHeight } = document.body.getBoundingClientRect()

    // Hard code the dimensions of the dialog for now
    const dialogWidth = 300
    const dialogHeight = 400

    const dialogX = (window.innerWidth - dialogWidth) / 2
    const dialogY = (window.innerHeight - dialogHeight) / 2

    console.log(`dialogX, y: ${dialogX}, ${dialogY}`)

    this.popupRef = this.popupService.open(
      componentType,
      { absoluteX: dialogX, absoluteY: dialogY },
      supplyParameters,
      (componentElement: HTMLElement) => {
        this.renderer.setStyle(componentElement, 'width', `${dialogWidth}px`)
        this.renderer.setStyle(componentElement, 'height', `${dialogHeight}px`)
        setStyles?.(componentElement)
      }
    )

    this.popupRef.onClose = (selectedItem?: any) => {
      if (selectedItem != null) {
        this.dialogRef.close(selectedItem)
      } else {
        this.dialogRef.close()
      }

      this.overlay!.animate([ { opacity: 1}, { opacity: 0}], { duration: 250 })

      setTimeout(() => {
        document.body.removeChild(this.overlay!)
      }, 200)

    }

    /*
    this.popupRef = {
      close: (value?: any | null) => {
        if (this.componentRef != null) {
          this.popupRef.onClose?.(value)
          this.dynamicComponentService.removeComponent(this.componentRef)
          this.componentRef = null
          document.removeEventListener('click', this.handleClickOutside)
        }
      }
    }

    if (this.componentRef == null) {
      this.componentRef = this.dynamicComponentService.appendComponentToBody(
        componentType,
        supplyParameters,
        () => [ { provide: PopupRef, useValue: this.popupRef } ],
        (componentElement: HTMLElement) => {
          this.renderer.setStyle(componentElement, 'position', 'absolute')
          this.renderer.setStyle(componentElement, 'left', `${popupOptions?.absoluteX ?? 0}px`)
          this.renderer.setStyle(componentElement, 'top', `${popupOptions?.absoluteY ?? 0}px`)
          setStyles?.(componentElement)
        }
      )

      setTimeout(() => {
        document.addEventListener('click', this.handleClickOutside)
      }, 100)

    }
    */



    return this.dialogRef
  }
}
