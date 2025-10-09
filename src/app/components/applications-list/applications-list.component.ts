import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NavbarComponent],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css'
})
export class ApplicationsListComponent implements OnInit {
  jobId!: string;
  applications: any[] = [];
  token: string | null = '';
  loading = true;
  apiUrl = 'http://localhost:5000/api/applications'; // replace with your backend URL

  constructor(private  jobService:JobService,  private authService :AuthService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.token = this.authService.getToken();
    this.getApplications();
  }

  getApplications() {
    this.jobService.getApplicationOnJobPost(this.token,this.jobId).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        this.applications = res || [];
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  updateStatus(user:any, newStatus: string): void {
    console.log(user, newStatus);

    this.jobService.updateApplicationStatus(this.token,user._id, newStatus).subscribe({
      next: () => {
        this.applications = this.applications.map(app =>
          app._id === user._id ? { ...app, status: newStatus } : app
        );
      },
      error: (err) => console.error('Error updating status:', err)
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'selected': return 'badge bg-success';
      case 'rejected': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  protected readonly HTMLSelectElement = HTMLSelectElement;
}
