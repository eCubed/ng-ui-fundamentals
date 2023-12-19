import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from 'src/app/widgets/date-picking/calendar/calendar.component';
import { DatePickerComponent } from 'src/app/widgets/date-picking/date-picker/date-picker.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
    CalendarComponent,
    DatePickerComponent
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent implements OnInit {

  valueFromCustomInput: string = 'Hello world'

  dataFormGroup!: FormGroup
  selectedDate = new Date(2022, 4, 23)

  ngOnInit(): void {
    this.dataFormGroup = new FormGroup({
      id: new FormControl(7),
      message: new FormControl('Start'),
      postedDate: new FormControl(new Date(2023,3,5))
    })
  }
}
