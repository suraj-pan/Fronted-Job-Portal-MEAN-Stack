import {Component, OnInit} from '@angular/core';
import { JobService } from '../../../services/job.service';
import {CommonModule, NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {NavbarComponent} from "../../navbar/navbar.component";


// job/job-list
@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements  OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  loading = true;

  // ✅ Filters
  searchTerm: string = '';
  locationFilter: string = '';
  constructor(private jobService: JobService, private router: Router,private authService:AuthService) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe({
      next: (res) => {
        this.jobs = res;
        this.filteredJobs = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.loading = false;
      }
    });
  }

  goToDetail(job: any) {
    this.router.navigate([`/job/${job._id}`]);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();

    this.filteredJobs = this.jobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        (job.skills && job.skills.some((s: string) => s.toLowerCase().includes(term)));

      const matchesLocation = this.locationFilter
        ? job.location.toLowerCase().includes(this.locationFilter.toLowerCase())
        : true;

      return matchesSearch && matchesLocation ;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.locationFilter = '';
    this.filteredJobs = this.jobs;
  }

}
