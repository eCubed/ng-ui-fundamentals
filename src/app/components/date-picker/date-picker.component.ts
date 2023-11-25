import { Component, ElementRef, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from 'src/app/services/popup.service';
import { DatePickerPopupComponent } from '../date-picker-popup/date-picker-popup.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerPopupComponent
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() date: Date = new Date()
  @Output() dateChange = new EventEmitter<Date>()
  isPopupShowing: boolean = false

  private onChange: (value: Date) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private popupService: PopupService,
              private elementRef: ElementRef) {

  }

  togglePopup() {
    this.isPopupShowing = !this.isPopupShowing

    if (this.isPopupShowing) {
      this.openDatePickerPopup()
    }
  }

  openDatePickerPopup() {
    const { x, y, height } = this.elementRef.nativeElement.getBoundingClientRect()

    const popupRef = this.popupService.open(DatePickerPopupComponent, {
      absoluteX: x,
      absoluteY: y + height,
    },
    (datePickerComponent) => {
      datePickerComponent.date = this.date
    })

    popupRef.onClose = (dateSelected?: Date) => {
      this.isPopupShowing = false
      if (dateSelected) {
        this.date = dateSelected
        this.dateChange.emit(dateSelected)
        this.onChange(dateSelected)

      }
    }
  }


  writeValue(obj: any): void {
    this.date = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }
}
