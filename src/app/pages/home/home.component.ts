import { MyComponentComponent } from './../../components/my-component/my-component.component';
import { OverlayableDirective } from '../../widgets/overlayable/overlayable.directive';
import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from 'src/app/widgets/click-outside/click-outside.directive';
import { TooltipDirective } from 'src/app/widgets/tooltip/tooltip.directive';
import { PopupRef, PopupService } from 'src/app/widgets/dynamics/popup.service';
import { ContextMenuComponent } from 'src/app/components/context-menu/context-menu.component';
import { ContextMenuDirective } from 'src/app/components/context-menu/context-menu.directive';
import { DialogRef, DialogService } from 'src/app/widgets/dynamics/dialog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, OverlayableDirective, TooltipDirective, ContextMenuComponent, ContextMenuDirective],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ClickOutsideDirective]
})
export class HomeComponent {
  showOverlay: boolean = true
  myComponentPopup!: PopupRef
  myComponentDialog!: DialogRef
  contextMenuItems = ['Item 1', 'Item 2', 'Item 3']


  constructor(private popupService: PopupService,
              private dialogService: DialogService,
              private renderer: Renderer2) {

  }

  onClickedOutside() {
    console.log('Clicked outside HANDLER!')
  }

  openPopup() {

    const myComponentPopup = this.popupService.open(MyComponentComponent, { absoluteX: 200, absoluteY: 200}, undefined, (el: HTMLElement) => {
      this.renderer.setStyle(el, 'position', 'absolute')
    })

    myComponentPopup.onClose = (value?: any) => {
      console.log(`The value returned from my component when I closed is: ${value}`)
    }

  }

  closePopup() {
    this.myComponentPopup?.close()
  }

  onItemSelected(selectedItem: string) {
    console.log(`The selected item from the context menu is: ${selectedItem}`)
  }

  openDialog() {
    this.myComponentDialog = this.dialogService.open(MyComponentComponent)

    this.myComponentDialog.onClose = (value?: any) => {
      console.log(`DIALOG...The value returned from my component when I closed is: ${value}`)
    }
  }
}
