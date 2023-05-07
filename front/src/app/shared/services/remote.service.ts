import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Remote } from "../models/Remote";
interface CreateRemoteDto {
    Date:Date;
    type:String;
    UserId:string;
    firstName:string;
    lastName:string;
}



@Injectable({ providedIn: "root" })
export class RemoteService {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createRemote(createRemoteDto: CreateRemoteDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/worktype`,
      createRemoteDto
    );
  }

  getRemotes(): Observable<Remote[]> {
    return this.http.get<Remote[]>(`${this.backendUrl}/api/worktype`);
  }

  getRemoteById(id: number): Observable<Remote> {
    return this.http.get<Remote>(`${this.backendUrl}/api/worktype/${id}`);
  }

  getMyRemote(): Observable<Remote[]> {
    return this.http.get<Remote[]>(`${this.backendUrl}/api/worktype/my-remote`);
  }

  editRemote(
    id: number,
    updateRemoteDto: CreateRemoteDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      ` ${this.backendUrl}/api/worktype/${id}`,
      updateRemoteDto
    );
  }

  deleteRemote(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/worktype/${id}`
    );
  }
}