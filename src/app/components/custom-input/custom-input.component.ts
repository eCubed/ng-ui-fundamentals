import { Component,  EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {


  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event) {
    const newValue = (event.target as HTMLDivElement).innerText;
    this.valueChange.emit(newValue);
    this.onChange(newValue)
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.value = obj
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
