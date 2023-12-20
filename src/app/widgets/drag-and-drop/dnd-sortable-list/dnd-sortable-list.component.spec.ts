import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndSortableListComponent } from './dnd-sortable-list.component';

describe('DndSortableListComponent', () => {
  let component: DndSortableListComponent;
  let fixture: ComponentFixture<DndSortableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DndSortableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DndSortableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
