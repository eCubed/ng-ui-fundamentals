import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableItemDirective } from '../draggable-item.directive';
import { ItemInsertionPointComponent } from '../item-insertion-point/item-insertion-point.component';
import { DraggingItem } from '../drag-and-drop-models';

@Component({
  selector: 'app-dnd-sortable-list',
  standalone: true,
  imports: [
    CommonModule,
    DraggableItemDirective,
    ItemInsertionPointComponent
  ],
  templateUrl: './dnd-sortable-list.component.html',
  styleUrl: './dnd-sortable-list.component.scss'
})
export class DndSortableListComponent<T extends any> {
  @Input() items: Array<T> = []
  @Input('item-template') itemTemplate?: TemplateRef<T>

  onItemDroppedOnInsertionPoint(draggingItem: DraggingItem<T>) {
    console.log(`dropped on insertion point: ${JSON.stringify(draggingItem)}`)
  }

  onItemDraggingOver(draggingItem: DraggingItem<T>) {
    console.log(`dragging over insertion point: ${JSON.stringify(draggingItem)}`)
  }

  createDroppedItemHandler(insertionPointIndex: number) {
    return (draggingItem: DraggingItem<T>) => {
      this.move(this.items, draggingItem.originalIndex!, insertionPointIndex)
    }
  }



  createOnCheckCanDrop(insertionPointIndex: number) {
    return (draggingItem?: DraggingItem<T> | null): boolean => {
      if (draggingItem == null)
        return false
      else {
        return (draggingItem.originalIndex != insertionPointIndex) && (draggingItem.originalIndex! + 1 != insertionPointIndex)
      }
    }
  }

  private move(input: Array<T>, from: number, to: number) {
    const elm = input.splice(from, 1)[0];
    if (to == input.length) {
      input.splice(to - 1, 0, elm);
    }
    else
      input.splice(to, 0, elm);

  }

}
