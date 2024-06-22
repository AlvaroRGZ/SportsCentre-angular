import {User} from "../../../User/user.model";
import {Installation} from "../../../installations/installation.model";

export interface SportClass {
  id: string;
  title: string;
  assistants: User[];
  places: number;
  installation: Installation;
}
