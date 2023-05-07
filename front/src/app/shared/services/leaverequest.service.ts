import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LeaveRequest } from "../models/LeaveRequest";
interface CreateLeaverequestDto {
    startDate:Date;
    endDate:Date;
    certificat:String;
    type:String;
    status:String;
    UserId:number;
    firstName:string;
    lastName:string;
}



@Injectable({ providedIn: "root" })
export class LeaverequestService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createLeaverequest(CreateLeaverequestDto:CreateLeaverequestDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/leaverequest`,
      CreateLeaverequestDto
    );
  }

  getLeaverequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.backendUrl}/api/leaverequest`);
  }

  getLeaverequestsById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.backendUrl}/api/leaverequest/${id}`);
  }

  getMyLeaverequest(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.backendUrl}/api/leaverequest/my-leaverequest`);
  }

  editLeaverequest(
    id: number,
    updateLeaverequestDto: CreateLeaverequestDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      ` ${this.backendUrl}/api/leaverequest/${id}`,
      updateLeaverequestDto
    );
  }

  deleteLeaverequest(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/leaverequest/${id}`
    );
  }
}