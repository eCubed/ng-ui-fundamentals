import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerPlopComponent } from './date-picker-plop.component';

describe('DatePickerPlopComponent', () => {
  let component: DatePickerPlopComponent;
  let fixture: ComponentFixture<DatePickerPlopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerPlopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePickerPlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
