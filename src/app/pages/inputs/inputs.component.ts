import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerPlopComponent } from 'src/app/components/date-picker-plop/date-picker-plop.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
    DatePickerPlopComponent
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss'
})
export class InputsComponent implements OnInit {

  valueFromCustomInput: string = 'Hello world'

  dataFormGroup!: FormGroup

  ngOnInit(): void {
    this.dataFormGroup = new FormGroup({
      id: new FormControl(7),
      message: new FormControl('Start')
    })
  }
}
