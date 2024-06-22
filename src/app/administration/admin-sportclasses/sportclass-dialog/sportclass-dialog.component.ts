import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SportClassesService} from "../services/sport-classes.service";
import {SportClassCreation} from "../services/sportclassCreation.model";
import {InstallationService} from "../../../installations/installation.service";
import {Installation} from "../../../installations/installation.model";
import {MatOption} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-sportclass-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatLabel,
    MatOption,
    NgForOf,
    MatSelect
  ],
  templateUrl: './sportclass-dialog.component.html',
  styleUrl: './sportclass-dialog.component.css'
})
export class SportclassDialogComponent implements OnInit{
  sportClassForm: FormGroup;
  protected installations: Installation[] = [];

  constructor(
    public dialogRef: MatDialogRef<SportclassDialogComponent>,
    private fb: FormBuilder,
    private sportClassService: SportClassesService,
    private installationService: InstallationService
  ) {
    this.sportClassForm = this.fb.group({
      title: ['', Validators.required],
      places: ['', Validators.required],
      installation: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadInstallations();
  }

  loadInstallations(): void {
    this.installationService.getInstallations().subscribe(data => {
      this.installations = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.sportClassForm.valid) {
      let newSportClass: SportClassCreation = {
        title: this.sportClassForm.value.title,
        places: this.sportClassForm.value.places,
        installation: this.sportClassForm.value.installation
      };

      this.sportClassService.createSportClass(newSportClass).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
