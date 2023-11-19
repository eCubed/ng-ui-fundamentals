import { ComponentRef, Injectable, Renderer2, RendererFactory2, Type } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

export interface PopupOptions {
  absoluteX: number
  absoluteY: number
}

export class PopupRef {
  open!: () => void
  close!: (value?: any | null) => void
  onClose?: (value?: any | null) => void
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {

  componentRef?: ComponentRef<any> | null
  renderer!: Renderer2
  popupRef!: PopupRef

  constructor(private dynamicComponentService: DynamicComponentService,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  handleClickOutside = (e: MouseEvent) => {
    if (this.componentRef != null && !this.componentRef!.location.nativeElement.contains(e.target)) {
      this.popupRef.onClose?.()
      this.dynamicComponentService.removeComponent(this.componentRef!)
      this.componentRef = null
      document.removeEventListener('click', this.handleClickOutside)
    }
  }

  popup<C extends any>(
    componentType: Type<C>,
    popupOptions?: PopupOptions,
    supplyParameters?: (componentInstance: C) => void,
    setStyles?: (componentElement: HTMLElement) => void,
    ): PopupRef {

    this.popupRef = {
      open: () => {
        if (this.componentRef == null) {
          this.componentRef = this.dynamicComponentService.appendComponentToBody(
            componentType,
            supplyParameters,
            () => [ { provide: PopupRef, useValue: this.popupRef } ],
            (componentElement: HTMLElement) => {
              this.renderer.setStyle(componentElement, 'left', `${popupOptions?.absoluteX ?? 0}px`)
              this.renderer.setStyle(componentElement, 'top', `${popupOptions?.absoluteY ?? 0}px`)
              setStyles?.(componentElement)
            }
          )

          setTimeout(() => {
            document.addEventListener('click', this.handleClickOutside)
          }, 100)
        }
      },
      close: (value?: any | null) => {
        if (this.componentRef != null) {
          this.popupRef.onClose?.(value)
          this.dynamicComponentService.removeComponent(this.componentRef)
          this.componentRef = null
          document.removeEventListener('click', this.handleClickOutside)
        }
      }
    }

    return this.popupRef
  }


}
