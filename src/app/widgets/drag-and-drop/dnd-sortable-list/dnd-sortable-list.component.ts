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
      let insertionPointIndexToUse = (insertionPointIndex == -1) ? 0 : insertionPointIndex
      insertionPointIndexToUse = (insertionPointIndex == this.items.length - 1) ? this.items.length : insertionPointIndexToUse

      this.move(this.items, draggingItem.originalIndex!, insertionPointIndexToUse)
    }
  }



  createOnCheckCanDrop(insertionPointIndex: number) {
    return (draggingItem?: DraggingItem<T> | null): boolean => {
      if (draggingItem == null)
        return false
      else {

        /*
        let insertionPointIndexToUse = (insertionPointIndex == -1) ? 0 : insertionPointIndex
        insertionPointIndexToUse = (insertionPointIndex == this.items.length - 1) ? this.items.length : insertionPointIndexToUse
        console.log(`orig index: ${draggingItem.originalIndex}, insertionPointIndex: ${insertionPointIndexToUse}`)
        */
        return (draggingItem.originalIndex != insertionPointIndex) && (draggingItem.originalIndex! - 1 != insertionPointIndex)
      }
    }
  }

  private move(input: Array<T>, from: number, to: number) {
    let numberOfDeletedElm = 1;

    const elm = input.splice(from, 1)[0];

    numberOfDeletedElm = 0;

    input.splice(to, numberOfDeletedElm, elm);
  }

}
