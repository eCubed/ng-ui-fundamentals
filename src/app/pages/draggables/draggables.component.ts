import { DraggableDirective } from '../../widgets/drag-and-drop/draggable.directive';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableAreaDirective } from 'src/app/widgets/drag-and-drop/draggable-area.directive';
import { DraggableItemDirective } from 'src/app/widgets/drag-and-drop/draggable-item.directive';
import { DropTargetDirective } from 'src/app/widgets/drag-and-drop/drop-target.directive';
import { DndSortableListComponent } from 'src/app/widgets/drag-and-drop/dnd-sortable-list/dnd-sortable-list.component';
import { DraggableItemHandleDirective } from 'src/app/widgets/drag-and-drop/draggable-item-handle.directive';

@Component({
  selector: 'app-draggables',
  standalone: true,
  imports: [
    CommonModule,
    DraggableDirective,
    DraggableAreaDirective,
    DraggableItemDirective,
    DraggableItemHandleDirective,
    DropTargetDirective,
    DndSortableListComponent,
  ],
  templateUrl: './draggables.component.html',
  styleUrl: './draggables.component.scss'
})
export class DraggablesComponent {
  items = [
    { id: 1, name: "apple" },
    { id: 2, name: "pc" },
    { id: 3, name: "blackberry"}
  ]

  onDropped(droppedItem: any) {
    console.log(`dropped item: ${JSON.stringify(droppedItem)}`)
  }
}
