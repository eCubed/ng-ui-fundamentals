import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from 'src/app/widgets/dynamics/popup.service';
import { DialogService } from 'src/app/widgets/dynamics/dialog.service';
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
    const dialogRef = this.dialogService.open(PromptDialogComponent,
      { dialogWidth: 300, dialogHeight: 200},
      (componentInstance) => {
        componentInstance.question = "Are you really realy sure you want to close?"
      })

    dialogRef.onClose = (answer?: any) => {
      if (answer) {
        this.popupRef.close('Yes, CLOZE.....')
      } else {
       //console.log(`Answer: no`)
      }
    }

  }

}
