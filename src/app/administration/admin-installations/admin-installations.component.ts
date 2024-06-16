import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Installation } from '../../installations/installation.model';
import { InstallationService } from '../../installations/installation.service';
import {CreateInstallationDialogComponent} from "./create-installation-dialog/create-installation-dialog.component";

@Component({
  selector: 'app-admin-installations',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './admin-installations.component.html',
  styleUrls: ['./admin-installations.component.css']
})
export class AdminInstallationsComponent implements OnInit {
  installations: Installation[] = [];
  displayedColumns: string[] = ['name', 'description', 'capacity', 'rentalPrice', 'actions'];

  constructor(
    private installationService: InstallationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInstallations();
  }

  loadInstallations(): void {
    this.installationService.getInstallations().subscribe(installations => {
      this.installations = installations;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateInstallationDialogComponent, {
      width: '400px',
      data: {
        installation: { name: '', description: '', capacity: null, rentalPrice: null },
        isUpdate: true,
        title: "Create installation"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createInstallation(result);
      }
    });
  }

  createInstallation(installation: Installation): void {
    this.installationService.createInstallation(installation).subscribe(() => {
      this.loadInstallations();
    });
  }

  openUpdateDialog(installation: Installation): void {
    const dialogRef = this.dialog.open(CreateInstallationDialogComponent, {
      width: '400px',
      data: { installation: installation, isUpdate: true, title: "Update installation"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInstallation(result);
      }
    });
  }

  updateInstallation(installation: Installation): void {
    this.installationService.updateInstallation(installation).subscribe(() => {
      this.loadInstallations();
    });
  }

  deleteInstallation(id: string): void {
    /*this.installationService.deleteInstallation(id).subscribe(() => {
      this.loadInstallations();
    });*/
  }
}
