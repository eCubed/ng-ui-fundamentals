import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  renderedMarkdown: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

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
    const html = this.markdownToHtml(this.markdownText);
    this.renderedMarkdown = this.sanitizer.bypassSecurityTrustHtml(html);

    // Notify the parent when the markdown text changes
    this.onChange(this.markdownText);
    this.onTouched();
  }

  private markdownToHtml(markdown: string): string {
    const headingsProcessed = this.convertHeadings(markdown)
    const inlinesProcessed = this.convertMarkdownToHtml(headingsProcessed)
    const unorderedListProcessed = this.convertLists(inlinesProcessed)
    const orderedlistProcessed = this.convertOrderedLists(unorderedListProcessed)
    const paragraphsProcessed = this.convertNewlinesToParagraphs(orderedlistProcessed)

    return paragraphsProcessed
  }

  private convertMarkdownToHtml(markdown: string): string {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const underlineRegex = /__(.*?)__/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;

    const withBold = markdown.replace(boldRegex, '<strong>$1</strong>');
    const withItalic = withBold.replace(italicRegex, '<em>$1</em>');
    const withUnderline = withItalic.replace(underlineRegex, '<u>$1</u>');
    const withInlineCode = withUnderline.replace(inlineCodeRegex, '<code>$1</code>');
    const withImages = withInlineCode.replace(imageRegex, '<img alt="$1" src="$2">');
    const withLinks = withImages.replace(linkRegex, '<a href="$2">$1</a>');


    return withLinks;
  }

  private convertHeadings(html: string): string {
    const headingRegex = /^(#{1,6})\s(.*)/gm;

    return html.replace(headingRegex, (_match, hashes, text) => {
      const level = hashes.length;
      return `<h${level}>${text.trim()}</h${level}>`;
    });
  }

  private convertNewlinesToParagraphs(html: string): string {
    // Split the HTML into lines
    const lines = html.split(/\n+/);

    // Wrap each line with a <p> tag
    const paragraphs = lines.map((line) => {

      if (!line.startsWith('<'))
        return `<p>${line}</p>`
      else
        return line

    });

    // Join the paragraphs back together
    return paragraphs.join('');
  }

  private convertLists(html: string): string {
    // Split the HTML into lines
    const lines = html.split(/\n+/);

    // Track if we are inside a list
    let inList = false;

    // Iterate through lines to identify and convert lists
    const convertedLines = lines.map((line) => {
      // Check if the line starts with an asterisk and a space
      const isListStart = /^\*\s/.test(line);

      if (inList && !isListStart) {
        // If we were inside a list and the current line is not a list item, close the list
        inList = false;
        return '</ul>\n' + line;
      } else if (!inList && isListStart) {
        // If we were not inside a list and the current line is a list item, open a new list
        inList = true;
        return '<ul><li>' + line.substr(2) + '</li>';
      } else if (inList && isListStart) {
        // If we were inside a list and the current line is a list item, continue the list
        return '<li>' + line.substr(2) + '</li>';
      } else {
        // Otherwise, leave the line unchanged
        return line;
      }
    });

    // Close the list if we were still inside a list at the end
    if (inList) {
      convertedLines.push('</ul>\n');
    }

    // Join the lines back together
    return convertedLines.join('\n')
  }

  private convertOrderedLists(html: string): string {
    // Split the HTML into lines
    const lines = html.split(/\n/);

    // Track if we are inside an ordered list
    let inList = false;

    // Iterate through lines to identify and convert ordered lists
    const convertedLines = lines.map((line) => {
      // Check if the line starts with a number, a period, and white space
      const isListStart = /^\d+\.\s/.test(line);

      if (inList && !isListStart) {
        // If we were inside an ordered list and the current line is not a list item, close the list
        inList = false;
        return '</ol>\n' + line;
      } else if (!inList && isListStart) {
        // If we were not inside an ordered list and the current line is a list item, open a new list
        inList = true;
        return '<ol><li>' + line.substr(line.indexOf(' ') + 1) + '</li>';
      } else if (inList && isListStart) {
        // If we were inside an ordered list and the current line is a list item, continue the list
        return '<li>' + line.substr(line.indexOf(' ') + 1) + '</li>';
      } else {
        // Otherwise, leave the line unchanged
        return line;
      }
    });

    // Close the list if we were still inside an ordered list at the end
    if (inList) {
      convertedLines.push('</ol>\n');
    }

    // Join the lines back together using the original newline character
    return convertedLines.join('\n');
  }
}
