import {Component, OnInit} from '@angular/core';
import {SportClass} from "../../../administration/admin-sportclasses/services/SportClass.model";
import {ActivatedRoute} from "@angular/router";
import {SportClassesService} from "../../../administration/admin-sportclasses/services/sport-classes.service";
import {NgForOf, NgIf} from "@angular/common";
import {FirebaseAuthService} from "../../../authentication/firebase-auth.service";

@Component({
  selector: 'app-sport-class-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './sport-class-details.component.html',
  styleUrl: './sport-class-details.component.css'
})
export class SportClassDetailsComponent implements OnInit {
  sportClass: SportClass | null = null;
  currentUserEmail: string;
  sportClassId: string = '';

  constructor(
    private route: ActivatedRoute,
    private sportClassService: SportClassesService,
    private authService: FirebaseAuthService
  ) {
    // this.sportClass = {} as SportClass;
    this.currentUserEmail = '';
  }

  ngOnInit() {
    this.getSportClassDetails();
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUserEmail = user?.email || '';
    })
  }

  getSportClassDetails(): void {
    this.sportClassId = this.route.snapshot.paramMap.get('id') || '';
    if (this.sportClassId) {
      this.sportClassService.getSportClassById(this.sportClassId).subscribe(
        data => this.sportClass = data,
        error => console.error('Error fetching sport class:', error)
      );
    }
  }

  toggleClassParticipation() {
    if (this.isCurrentUserInClass()) {
      this.leaveClass();
    } else {
      this.joinClass();
    }
  }

  isCurrentUserInClass(): boolean {
    return this.sportClass?.assistants.some(assistant => assistant.email === this.currentUserEmail) ?? false;
  }

  joinClass() {
    this.sportClassService.applyForClass(this.sportClassId, this.currentUserEmail).subscribe((sportClass) => {
      console.log(this.currentUserEmail + ' Joining class');
      this.getSportClassDetails();
    });
  }

  leaveClass() {
    this.sportClassService.removeFromClass(this.sportClassId, this.currentUserEmail).subscribe((sportClass) => {
      console.log(this.currentUserEmail + ' Leaving class');
      this.getSportClassDetails();
    });
  }

}
