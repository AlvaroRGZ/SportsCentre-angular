import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Installation } from '../../../installations/installation.model';
import { FormsModule } from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {BooleanInput} from "@angular/cdk/coercion";


@Component({
  selector: 'app-create-installation-dialog',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogContent,
    MatDialogTitle,
    MatLabel
  ],
  templateUrl: './create-installation-dialog.component.html',
  styleUrl: './create-installation-dialog.component.css'
})
export class CreateInstallationDialogComponent {
  isUpdate: BooleanInput = false;
  protected installation: Installation;
  protected title: string;
  constructor(
    public dialogRef: MatDialogRef<CreateInstallationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {installation: Installation, isUpdate: boolean, title: string}
  ) {
    this.installation = data.installation;
    this.isUpdate = data.isUpdate || false;
    this.title = data.title || 'Update Installation';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.installation);
  }
}
