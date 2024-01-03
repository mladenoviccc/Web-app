import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}

