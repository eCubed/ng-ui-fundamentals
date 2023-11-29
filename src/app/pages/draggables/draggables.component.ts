import { DraggableDirective } from './../../directives/draggable.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableAreaDirective } from 'src/app/directives/draggable-area.directive';

@Component({
  selector: 'app-draggables',
  standalone: true,
  imports: [
    CommonModule,
    DraggableDirective,
    DraggableAreaDirective
  ],
  templateUrl: './draggables.component.html',
  styleUrl: './draggables.component.scss'
})
export class DraggablesComponent {

}
