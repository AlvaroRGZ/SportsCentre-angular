import {Material} from "../../../../materials/material.model";
import {Installation} from "../../../installation.model";
import {User} from "@angular/fire/auth";
import {UserAccount} from "../../../../signup/userAccount.model";

export interface Booking {
  id: string,
  datetime: Date;
  registrationTime: Date;
  booker: string;
  installation: string;
  materials: string[];
}
