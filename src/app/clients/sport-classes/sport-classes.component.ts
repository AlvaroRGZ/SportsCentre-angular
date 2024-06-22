import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SportClass} from "../../administration/admin-sportclasses/services/SportClass.model";
import {SportClassesService} from "../../administration/admin-sportclasses/services/sport-classes.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sport-classes',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './sport-classes.component.html',
  styleUrl: './sport-classes.component.css'
})
export class SportClassesComponent implements OnInit {
  sportClasses: SportClass[] = [];

  constructor(private sportClassService: SportClassesService) {}

  ngOnInit() {
    this.getSportClasses();
  }

  getSportClasses(): void {
    this.sportClassService.getSportClasses().subscribe(
      (classes: SportClass[]) => {
        this.sportClasses = classes;
      },
      error => {
        console.error('Error loading sport classes:', error);
      }
    );
  }
}
