import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownDisplayComponent } from '../markdown-display/markdown-display.component';

@Component({
  selector: 'app-markdown-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MarkdownDisplayComponent
  ],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class MarkdownEditorComponent implements ControlValueAccessor {
  markdownText: string = '';

  constructor() {}

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.markdownText = value || '';
    this.updatePreview();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // If your component supports disabling, implement this method
    // For simplicity, let's leave it empty for now
  }

  updatePreview() {

    // Notify the parent when the markdown text changes
    this.onChange(this.markdownText);
    this.onTouched();
  }

}
