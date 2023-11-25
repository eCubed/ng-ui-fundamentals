import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/services/popup.service';
import { DatePickerPlopComponent } from '../date-picker-plop/date-picker-plop.component';

@Component({
  selector: 'app-date-picker-popup',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerPlopComponent
  ],
  templateUrl: './date-picker-popup.component.html',
  styleUrl: './date-picker-popup.component.scss'
})
export class DatePickerPopupComponent {
  @Input() date: Date = new Date()
  @Output() dateChange = new EventEmitter<Date>();

  constructor(private popupRef: PopupRef) {

  }

  onDateChange(newDate: Date) {
    this.popupRef.close(newDate)
  }
}
