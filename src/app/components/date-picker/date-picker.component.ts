import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from 'src/app/services/popup.service';
import { DatePickerPopupComponent } from '../date-picker-popup/date-picker-popup.component';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerPopupComponent
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  @Input() date: Date = new Date()
  @Output() dateChange = new EventEmitter<Date>()
  isPopupShowing: boolean = false

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
      console.log(`popup ref closed: ${dateSelected}`)
      this.isPopupShowing = false
      if (dateSelected) {
        //this.date = dateSelected
        this.dateChange.emit(dateSelected)
        /* We would also write code here for
        */
      }
    }
  }
}
