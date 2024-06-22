import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {SportClassesService} from "./services/sport-classes.service";
import {MatDialog} from "@angular/material/dialog";
import {SportClass} from "./services/SportClass.model";
import {SportclassDialogComponent} from "./sportclass-dialog/sportclass-dialog.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-admin-sportclasses',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatTable,
    MatButton
  ],
  templateUrl: './admin-sportclasses.component.html',
  styleUrl: './admin-sportclasses.component.css'
})
export class AdminSportclassesComponent  implements OnInit {
  displayedColumns: string[] = ['title', 'installation', 'places', 'assistants', 'actions'];
  dataSource: MatTableDataSource<SportClass>  = new MatTableDataSource<SportClass>();

  constructor(private sportClassService: SportClassesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSportClasses();
  }

  loadSportClasses(): void {
    this.sportClassService.getSportClasses().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SportclassDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSportClasses();
      }
    });
  }

  editSportClass(element: SportClass) {

  }

  deleteSportClass(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Delete Sport class', message: 'Are you sure?'}
    });
    dialogRef.afterClosed().subscribe(confirmedAction => {
      if (confirmedAction) {
        this.sportClassService.deleteSportClass(id).subscribe(() => {
          this.loadSportClasses();
        });
      }
    });
  }
}
