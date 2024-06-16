import {Complaint} from "../clients/complaints/complaint.model";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  complaints: Complaint[];
}
