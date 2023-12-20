import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropTargetDirective } from '../drop-target.directive';

@Component({
  selector: 'app-item-insertion-point',
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [
    {
      directive: DropTargetDirective,
      inputs: ['canDropCallback'],
      outputs: ['dropped', 'draggingOver']
    }
  ],
  templateUrl: './item-insertion-point.component.html',
  styleUrl: './item-insertion-point.component.scss'
})
export class ItemInsertionPointComponent {
  @Input('item-index') itemIndex!: number
}
