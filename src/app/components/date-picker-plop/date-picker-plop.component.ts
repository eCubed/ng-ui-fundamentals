import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarCellItem {
  date: Date
  displayDate: number | null
}

@Component({
  selector: 'app-date-picker-plop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker-plop.component.html',
  styleUrl: './date-picker-plop.component.scss'
})
export class DatePickerPlopComponent {
  @Input() date: Date = new Date()
  @Output() dateChange = new EventEmitter<Date>();

  daysOfWeek = ['S', 'M', 'T', 'W', 'R', 'F', 'A'];
  calendarGrid: CalendarCellItem[][] = [];
  currentMonth: string = ''

  ngOnInit() {
    this.generateCalendarGrid(this.date);
  }

  updateCurrentMonth(): void {
    this.currentMonth = this.date.toLocaleDateString(undefined, { month: 'long', year: 'numeric'});
  }

  private daysFromNextMonth(startDay: number, daysInMonth: number): number {
    return (7 - (startDay + daysInMonth) % 7) % 7;
  }

  generateCalendarGrid(selectedDate: Date): void {
    console.log(`Selectedd ate: ${selectedDate}`)
    this.updateCurrentMonth()
    this.calendarGrid = [];

    // Clone the selected date to avoid mutating the original
    const currentDate = new Date(selectedDate);

    // Set the date to the first day of the month
    currentDate.setDate(1);

    // Determine the starting day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const startDay = currentDate.getDay();

    // Calculate the number of days in the current month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Calculate the number of days to display from the previous month
    const daysFromPrevMonth = startDay === 0 ? 6 : startDay;

    // Calculate the total number of cells needed to display the calendar
    const totalCells = daysInMonth + daysFromPrevMonth + this.daysFromNextMonth(startDay, daysInMonth)

    // Initialize variables to track the current date while iterating through cells
    let currentDay = 1;
    let currentRow: CalendarCellItem[] = [];

    for (let i = 0; i < totalCells; i++) {
      // Determine if the current cell represents a day from the previous month
      const isPrevMonth = i < daysFromPrevMonth;

      // Determine if the current cell represents a day from the next month
      const isNextMonth = i >= daysInMonth + daysFromPrevMonth;

      // Determine the date for the current cell
      const cellDate = isPrevMonth
        ? new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            daysInMonth - daysFromPrevMonth + i + 1
          )
        : isNextMonth
        ? new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            i - daysInMonth - daysFromPrevMonth + 1
          )
        : new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);

      // Push the cell information to the current row
      currentRow.push({
        date: cellDate,
        displayDate: isPrevMonth || isNextMonth ? null : currentDay,
      });

      // If we've completed a week, start a new row
      if ((i + 1) % 7 === 0 || i === totalCells - 1) {
        this.calendarGrid.push(currentRow);
        currentRow = [];
      }

      // If the current cell represents a day from the current month, increment the day counter
      if (!isPrevMonth && !isNextMonth) {
        currentDay++;
      }
    }
  }

  selectDate(selectedDate: Date): void {
    this.dateChange.emit(selectedDate);
  }
}
