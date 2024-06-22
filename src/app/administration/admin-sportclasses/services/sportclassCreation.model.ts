import {User} from "../../../User/user.model";
import {Installation} from "../../../installations/installation.model";

export interface SportClassCreation {
  title: string;
  places: number;
  installation: string;
}
