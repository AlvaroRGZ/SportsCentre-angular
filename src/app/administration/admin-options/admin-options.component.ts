import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-options',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-options.component.html',
  styleUrl: './admin-options.component.css'
})
export class AdminOptionsComponent {

}
