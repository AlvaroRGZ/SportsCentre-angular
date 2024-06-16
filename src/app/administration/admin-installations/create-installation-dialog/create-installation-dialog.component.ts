import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Installation } from '../../../installations/installation.model';
import { FormsModule } from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {BooleanInput} from "@angular/cdk/coercion";
import {InstallationService} from "../../../installations/installation.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-create-installation-dialog',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatInput,
    MatError,
    MatDialogContent,
    MatDialogTitle,
    MatLabel,
    NgIf
  ],
  templateUrl: './create-installation-dialog.component.html',
  styleUrl: './create-installation-dialog.component.css'
})
export class CreateInstallationDialogComponent {
  isUpdate: BooleanInput = false;
  protected installation: Installation;
  protected title: string;
  protected nameAvailable: boolean = true;
  constructor(
    public installationService: InstallationService,
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
    if (this.nameAvailable || this.isUpdate) {
      this.dialogRef.close(this.installation);
    }
  }

  isFormValid(): boolean {
    return this.installation.name.trim() !== '' && this.installation.capacity > 0 && this.installation.rentalPrice > 0 && (this.nameAvailable);
  }

  validateNewInstallation(): void {
    if (!this.isUpdate) {
      this.installationService.isInstallationNameAvailable(this.installation.name).subscribe(
        (available: boolean) => {
          this.nameAvailable = available;
          if (!this.nameAvailable) {
            console.log('Installation name is already taken.');
          }
        },
        (error) => {
          console.error('Error checking installation name availability:', error);
        }
      );
    }
  }
}
