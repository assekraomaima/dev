import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Mission } from "../models/Mission";
interface CreateMissionDto {
    startDate:Date;
    endDate:Date;
    description:String;
    UserId:string;
    firstName:string;
    lastName:string;
}



@Injectable({ providedIn: "root" })
export class MissionService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createMission(createMissionDto: CreateMissionDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/mission`,
      createMissionDto
    );
  }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.backendUrl}/api/mission`);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.backendUrl}/api/mission/${id}`);
  }

  getMyMission(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.backendUrl}/api/mission/my-mission`);
  }

  editMission(
    id: number,
    updateMissionDto: CreateMissionDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      ` ${this.backendUrl}/api/mission/${id}`,
      updateMissionDto
    );
  }

  deleteMission(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/mission/${id}`
    );
  }
}