import {Component, Inject} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import {MatButton} from "@angular/material/button";
import {Notice} from "../../../notice/notice.model";
import {MatDatepickerInput} from "@angular/material/datepicker";

@Component({
  selector: 'app-create-notice-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatInputModule,
    MatDatepickerInput
  ],
  templateUrl: './create-notice-dialog.component.html',
  styleUrl: './create-notice-dialog.component.css'
})
export class CreateNoticeDialogComponent {
  isUpdate: boolean;
  notice: Notice;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<CreateNoticeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notice: Notice, isUpdate: boolean, title: string }
  ) {
    this.notice = { ...data.notice }; // Create a copy to avoid direct mutation
    this.isUpdate = data.isUpdate || false;
    this.title = data.title || 'Add New Notice';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.notice.dateTime = new Date();
    this.dialogRef.close(this.notice);
  }

  isFormValid(): boolean {
    return this.notice.title.trim() !== '' && this.notice.body.trim() !== '';
  }
}
