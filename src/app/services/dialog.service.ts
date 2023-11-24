import { Injectable, Renderer2, RendererFactory2, Type } from '@angular/core';
import { PopupRef, PopupService } from './popup.service';

export class DialogRef {
  close!: (value?: any | null) => void
  onClose?: (value?: any | null) => void
}

export class DialogOptions {
  dialogWidth?: number
  dialogHeight?: number
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

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
    dialogOptions?: DialogOptions | null,
    supplyParameters?: (componentInstance: C) => void,
    setStyles?: (componentElement: HTMLElement) => void,
    ): DialogRef {

    let popupRef: PopupRef

    // Set up the dialog ref first.
    const dialogRef: DialogRef = {
      close: (value?: any | null) => {
          dialogRef.onClose?.(value)
      }
    }

    // Then plop the overlay
    const overlay = this.createDialogOverlay()
    overlay.animate([ { opacity: 0}, { opacity: 1}], { duration: 250 })
    overlay.addEventListener('click', () => {

      if (popupRef != null) {
        popupRef.close()
      }
    })
    document.body.appendChild(overlay)

    popupRef = this.popupService.open(
      componentType,
      { considerClickOutside: false },
      supplyParameters,
      (componentElement: HTMLElement) => {
        const { width: componentWidth, height: componentHeight } = componentElement.getBoundingClientRect()
        console.log(`cw: ${componentWidth}, ch: ${componentHeight}`)

        if (dialogOptions?.dialogWidth && dialogOptions?.dialogHeight) {
          this.renderer.setStyle(componentElement, 'width', `${dialogOptions.dialogWidth}px`)
          this.renderer.setStyle(componentElement, 'height', `${dialogOptions.dialogHeight}px`)
        }

        const dialogX = (window.innerWidth - (dialogOptions?.dialogWidth ?? componentWidth )) / 2
        const dialogY = (window.innerHeight - (dialogOptions?.dialogHeight ?? componentHeight)) / 2
        this.renderer.setStyle(componentElement, 'left', `${dialogX}px`)
        this.renderer.setStyle(componentElement, 'top', `${dialogY}px`)
        this.renderer.setStyle(componentElement, 'box-shadow', '0px 0px 7px 0px rgba(0,0,0,0.37)')
        setStyles?.(componentElement)
      }
    )

    popupRef.onClose = (selectedItem?: any) => {
      if (selectedItem != null) {
        dialogRef.close(selectedItem)
      } else {
        dialogRef.close()
      }

      overlay!.animate([ { opacity: 1}, { opacity: 0}], { duration: 250 })

      setTimeout(() => {
        document.body.removeChild(overlay!)
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



    return dialogRef
  }
}
