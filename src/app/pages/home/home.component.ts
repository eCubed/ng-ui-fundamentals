import { OverlayableDirective } from './../../directives/overlayable.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, OverlayableDirective, TooltipDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showOverlay: boolean = true
  onClickedOutside() {
    console.log('Clicked outside HANDLER!')
  }
}
