import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

interface LoginRequest {
  username: string;
  password: string;
}

interface UserResponse {
  id: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<UserResponse> {
    const body: LoginRequest = { username, password };
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, body);
  }
}