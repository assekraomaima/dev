import { User } from "./User";
export interface LeaveRequest {
  User: any;
  UserId: number;
  Users: User;
  id: number;
  startDate:Date;
  endDate:Date;
  certificat:string;
  type:string;
  status:string;
  createdAt: string;
  updatedAt: string;
}