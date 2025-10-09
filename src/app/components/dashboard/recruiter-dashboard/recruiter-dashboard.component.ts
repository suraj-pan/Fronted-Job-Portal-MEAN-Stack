import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {AuthService} from "../../../services/auth.service";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './recruiter-dashboard.component.html',
  styleUrl: './recruiter-dashboard.component.css'
})
export class RecruiterDashboardComponent implements OnInit {
  jobs: any[] = [];
  token: string | null = '';
  loading =false
  constructor(private jobService: JobService, private authService: AuthService,  private router: Router) {
    this.loading=true;
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (this.token) {
      // Ideally you'd call an API like /api/jobs/mine to fetch recruiter’s jobs
      this.jobService.getRecruiterJobPost(this.token).subscribe((res) => {
        // filter jobs by recruiterId (backend should support this ideally)
        console.log(res);
        this.loading = false;
        this.jobs = res;
      });
    }
  }

  getShowApplications(job:any){
        this.router.navigate([`/application/${job._id}/status`]);
  }
}
