import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {Material} from "../../../materials/material.model";
import {MaterialsService} from "../../../materials/materials.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create-material-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    NgIf
  ],
  templateUrl: './create-material-dialog.component.html',
  styleUrls: ['./create-material-dialog.component.css']
})
export class CreateMaterialDialogComponent {
  isUpdate: boolean = false;
  material: Material;
  title: string;
  nameAvailable: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { material: Material, isUpdate: boolean, title: string },
    private materialService: MaterialsService
  ) {
    this.material = { ...data.material }; // Create a copy to avoid direct mutation
    this.isUpdate = data.isUpdate || false;
    this.title = data.title || 'Add New Material';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.material);
  }

  isFormValid(): boolean {
    return this.material.name.trim() !== '' && this.material.quantity > 0;
  }

  validateNewMaterial(): void {
    /*
    if (!this.isUpdate) {
      this.materialService.isMaterialNameAvailable(this.material.name).subscribe(
        (available: boolean) => {
          this.nameAvailable = available;
          if (!this.nameAvailable) {
            console.log('Material name is already taken.');
          }
        },
        (error) => {
          console.error('Error checking material name availability:', error);
        }
      );
    }*/
    this.nameAvailable = true;
  }
}
