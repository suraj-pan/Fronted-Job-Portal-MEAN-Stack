import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRecruiterJobPost(token:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/recruiter/my-jobs`,{headers: headers} );
  }

  getApplicationOnJobPost(token:any,jobID:any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${environment.apiUrl}/recruiter/job/${jobID}/applicants`,{headers: headers} );
  }

  updateApplicationStatus(
    token: any, applicationId: string, status: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${environment.apiUrl}/recruiter/application/${applicationId}/status`,
      { status }, // ✅ body
      { headers } // ✅ options
    );
  }

  createJob(data: any,token:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, data,{headers});
  }
}
