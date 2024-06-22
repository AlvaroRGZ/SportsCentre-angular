import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {SportClassesService} from "../../administration/admin-sportclasses/services/sport-classes.service";
import {FirebaseAuthService} from "../../authentication/firebase-auth.service";
import {SportClass} from "../../administration/admin-sportclasses/services/SportClass.model";

@Component({
  selector: 'app-my-sport-classes',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe
  ],
  templateUrl: './my-sport-classes.component.html',
  styleUrl: './my-sport-classes.component.css'
})
export class MySportClassesComponent implements OnInit {
  sportClasses: SportClass[] = [];
  displayedColumns: string[] = ['title', 'installation', 'actions'];
  currentUserEmail: string = '';

  constructor(private sportClassesService: SportClassesService,
              private authService: FirebaseAuthService) {}

  ngOnInit(): void {
    this.fetchUsersSportClasses();
  }

  fetchUsersSportClasses() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserEmail = user?.email!;
      this.sportClassesService.getUserSportClasses(user?.email!).subscribe(classes => {
        // Assuming the service returns classes grouped by location or similar
        this.sportClasses = classes;
      }, error => {
        console.error('Error fetching sport classes:', error);
      });
    });
  }

  leaveClass(classId: string) {

    this.sportClassesService.removeFromClass(classId, this.currentUserEmail).subscribe(() => {
      this.fetchUsersSportClasses();
    }, error => {
      console.error('Failed to leave class:', error);
    });
  }
}
