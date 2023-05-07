import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    private backendUrl = environment.backendUrl;
    constructor(private http: HttpClient) {}

    forgotPassword(email: string): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
          `${this.backendUrl}/api/auth/forget-password`,
          {
            email,
          }
        );
      }
    
      resetPassword(
        token: string,
        password: string
      ): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
          `${this.backendUrl}/api/auth/reset-password/${token}`,
          {
            password,
          }
        );
      }
    
      checkToken(token: string): Observable<{ exist: boolean }> {
        return this.http.post<{ exist: boolean }>(
          `${this.backendUrl}/api/auth/check-token`,
          { token }
        );
      }
}