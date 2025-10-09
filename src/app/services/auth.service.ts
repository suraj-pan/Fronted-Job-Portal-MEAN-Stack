import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isRecruiter(): boolean {
    return this.getRole() === 'recruiter';
  }

  isJobSeeker(): boolean {
    return this.getRole() === 'jobseeker';
  }

  saveToken(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData) );
  }


  /** ✅ Returns ONLY token string */
  getToken(): string | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    try {
      const parsed = JSON.parse(userData);
      return parsed.token;
    } catch {
      return null;
    }
  }

  /** ✅ Returns entire stored user object */
  getUser(): any | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    try {
      return JSON.parse(userData).user;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

}
