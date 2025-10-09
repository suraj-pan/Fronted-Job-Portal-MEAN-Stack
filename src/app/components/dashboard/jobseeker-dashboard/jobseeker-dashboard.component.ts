import { Component } from '@angular/core';
import {ApplicationService} from "../../../services/application.service";
import {AuthService} from "../../../services/auth.service";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [ CommonModule,NavbarComponent],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrl: './jobseeker-dashboard.component.css'
})
export class JobseekerDashboardComponent {
  applications: any[] = [];
  token: string | null = '';
  userName ='suraj'
  loading=false
  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {
    this.loading=true;
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      // 🔹 Ideally backend should have GET /applications/my
      // For now you can mock or connect this later
      this.applicationService.getMyApplications(this.token).subscribe({
        next: (res) => {
          this.loading=false;
          this.applications = res;
        },
        error: (err) => {
          console.error('Error fetching applications', err);
        }
      });
    }
  }
}
