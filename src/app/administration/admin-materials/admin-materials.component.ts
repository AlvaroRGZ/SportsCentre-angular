import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {Material} from "../../materials/material.model";
import {CreateMaterialDialogComponent} from "./create-material-dialog/create-material-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MaterialsService} from "../../materials/materials.service";

@Component({
  selector: 'app-admin-materials',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './admin-materials.component.html',
  styleUrl: './admin-materials.component.css'
})
export class AdminMaterialsComponent  implements OnInit {
  materials: Material[] = [];
  displayedColumns: string[] = ['name', 'description', 'quantity', 'actions'];

  constructor(
    private materialService: MaterialsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getMaterials().subscribe(materials => {
      this.materials = materials;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateMaterialDialogComponent, {
      width: '400px',
      data: { material: {name: '', description: '', quantity: 0}, isUpdate: false, title: "Add New Material" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createMaterial(result);
      }
    });
  }

  createMaterial(material: Material): void {
    this.materialService.createMaterial(material).subscribe(() => {
      this.loadMaterials();
    });
  }

  openUpdateDialog(material: Material): void {
    const dialogRef = this.dialog.open(CreateMaterialDialogComponent, {
      width: '400px',
      data: { material: material, isUpdate: true, title: "Update Material" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMaterial(result);
      }
    });
  }

  updateMaterial(material: Material): void {
    this.materialService.updateMaterial(material).subscribe(() => {
      this.loadMaterials();
    });
  }

  deleteMaterial(id: string): void {
    this.materialService.deleteMaterial(id).subscribe(() => {
      this.loadMaterials();
    });
  }

}
