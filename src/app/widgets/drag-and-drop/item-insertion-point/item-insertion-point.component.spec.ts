import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInsertionPointComponent } from './item-insertion-point.component';

describe('ItemInsertionPointComponent', () => {
  let component: ItemInsertionPointComponent;
  let fixture: ComponentFixture<ItemInsertionPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemInsertionPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemInsertionPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
