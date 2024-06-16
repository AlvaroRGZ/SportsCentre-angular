import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Complaint } from '../complaint.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-create-complaint-dialog',
  templateUrl: './create-complaint-dialog.component.html',
  styleUrls: ['./create-complaint-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class CreateComplaintDialogComponent {
  complaint: Complaint = { id: '', title: '', body: '', datetime: new Date() };
  title: string;

  constructor(
    public dialogRef: MatDialogRef<CreateComplaintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, title: string }
  ) {
    this.title = data.title;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.complaint);
  }
}
