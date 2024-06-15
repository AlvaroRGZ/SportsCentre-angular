import {Component, OnInit} from '@angular/core';
import {Installation} from "./installation.model";
import {InstallationService} from "./installation.service";
import {NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-installations',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    RouterLink
  ],
  templateUrl: './installations.component.html',
  styleUrl: './installations.component.css'
})
export class InstallationsComponent implements OnInit {
  installations: Installation[] = [];

  constructor(private installationService: InstallationService) { }

  ngOnInit(): void {
    this.installationService.getInstallations().subscribe((data: Installation[]) => {
      this.installations = data;
    });
  }
}
