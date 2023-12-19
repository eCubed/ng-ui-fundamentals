import { ComponentRef, EmbeddedViewRef, Injectable, Renderer2, RendererFactory2, Type } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';

export interface PopupOptions {
  absoluteX?: number
  absoluteY?: number
  considerClickOutside?: boolean
}

export class PopupRef {
  close!: (value?: any | null) => void
  onClose?: (value?: any | null) => void
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {

  renderer!: Renderer2

  constructor(private dynamicComponentService: DynamicComponentService,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  generateHandleClickOutsideFunction(componentRef: ComponentRef<any>, popupRef: PopupRef) {
    const generatedHandleClickOutsideFunction = (e: MouseEvent) => {
      if (componentRef != null && !componentRef!.location.nativeElement.contains(e.target)) {
        popupRef.onClose?.()
        this.dynamicComponentService.removeComponent(componentRef!)
        document.removeEventListener('click', generatedHandleClickOutsideFunction)
      }
    }

    return generatedHandleClickOutsideFunction
  }

  open<C extends any>(
    componentType: Type<C>,
    popupOptions?: PopupOptions | null,
    supplyParameters?: (componentInstance: C) => void,
    setStyles?: (componentElement: HTMLElement) => void,
    ): PopupRef {
    let popupRef: PopupRef
    let componentRef: ComponentRef<any>

    let handleClickOutsideFunction: (e: MouseEvent) => void

    popupRef = {
      close: (value?: any | null) => {
        if (componentRef != null) {
          popupRef.onClose?.(value)
          this.dynamicComponentService.removeComponent(componentRef)
          if (handleClickOutsideFunction != null)
            document.removeEventListener('click', handleClickOutsideFunction)
        }
      }
    }

    componentRef = this.dynamicComponentService.appendComponentToBody(
      componentType,
      supplyParameters,
      () => [ { provide: PopupRef, useValue: popupRef } ],
      (componentElement: HTMLElement) => {
        this.renderer.setStyle(componentElement, 'position', 'absolute')

        if (popupOptions?.absoluteX != undefined)
          this.renderer.setStyle(componentElement, 'left', `${popupOptions?.absoluteX ?? 0}px`)


        if (popupOptions?.absoluteY != undefined)
          this.renderer.setStyle(componentElement, 'top', `${popupOptions?.absoluteY ?? 0}px`)

        setStyles?.(componentElement)
      }
    )

    if (popupOptions?.considerClickOutside == null || popupOptions.considerClickOutside) {
      handleClickOutsideFunction = this.generateHandleClickOutsideFunction(componentRef, popupRef)

      setTimeout(() => {
        document.addEventListener('click', handleClickOutsideFunction)
      }, 100)
    }

    return popupRef
  }


}
