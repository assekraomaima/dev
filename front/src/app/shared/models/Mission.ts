import { User } from "./User";
export interface Mission{
  UserId: number;
  Users: User;
  id: number;
  startDate:Date;
  endDate:Date;
  description:String;
  createdAt: string;
  updatedAt: string;

}