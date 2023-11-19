import { ApplicationRef, ClassProvider, ComponentFactoryResolver, ComponentRef, ConstructorProvider, EmbeddedViewRef, ExistingProvider, FactoryProvider, Injectable, Injector, StaticClassProvider, Type, TypeProvider, ValueProvider } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  //private componentRef?: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendComponentToBody<C extends any>(
    componentType: Type<C>,
    supplyParameters?: (componentInstance: C) => void,
    supplyInjectedItems?: () => (any[] | ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | TypeProvider | ClassProvider)[],
    setStyles?: (componentElement: HTMLElement) => void,
    ): ComponentRef<C> {

    const injectorToUse = (supplyInjectedItems == null)
      ? this.injector
      : Injector.create({
          providers: supplyInjectedItems(),
          parent: this.injector
        })

    const factory = this.componentFactoryResolver.resolveComponentFactory<C>(componentType)
    const componentRef = factory.create(injectorToUse)
    supplyParameters?.(componentRef.instance)

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<C>).rootNodes[0] as HTMLElement
    setStyles?.(domElem)
    domElem.animate([ { opacity: 0}, { opacity: 1}], { duration: 250 })
    document.body.appendChild(domElem)


    //this.componentRef = componentRef

    return componentRef
  }

  removeComponent<C extends any>(componentRef: ComponentRef<C>) {

    //if (this.appRef.)
    const domElem = (componentRef.hostView as EmbeddedViewRef<C>).rootNodes[0] as HTMLElement
    domElem.animate([ { opacity: 1}, { opacity: 0}], { duration: 250 })

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 200)

  }
}
