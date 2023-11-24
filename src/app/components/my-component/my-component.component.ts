import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/services/popup.service';
import { DialogService } from 'src/app/services/dialog.service';
import { PromptDialogComponent } from '../prompt-dialog/prompt-dialog.component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
})
export class MyComponentComponent {

  constructor(private popupRef: PopupRef,
              private dialogService: DialogService) {}

  close() {
    //this.popupRef.close('Cloze string...')

    const dialogRef = this.dialogService.open(PromptDialogComponent,
      (componentInstance) => {
        componentInstance.question = "Are you really realy sure you want to close?"
      })

    dialogRef.onClose = (answer?: any) => {
      if (answer) {
        this.popupRef.close('Yes, CLOZE.....')
        console.log(`AnsweR: ${answer}`)
      } else {
        console.log(`Answer: no`)
        this.popupRef.close()
      }
    }

  }

}
