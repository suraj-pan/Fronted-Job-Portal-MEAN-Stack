import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {JobService} from "../../../services/job.service";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  job: any = null;
  loading = true; // ✅ loading state

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id') || '';
    this.jobService.getJobs().subscribe({
      next: (res) => {
        this.job = res.find((j: any) => j._id === jobId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching job:', err);
        this.loading = false;
      }
    });
  }

  applyNow() {
    if (this.job) {
      this.router.navigate(['/apply', this.job._id]);
    }
  }
}
