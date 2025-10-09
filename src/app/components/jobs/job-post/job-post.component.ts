import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {JobService} from "../../../services/job.service";
import {AuthService} from "../../../services/auth.service";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-job-post',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './job-post.component.html',
  styleUrl: './job-post.component.css'
})
export class JobPostComponent {
  title = '';
  description = '';
  location = '';
  salary = '';
  skills = '';
  company = '';

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  postJob() {

    const token = this.authService.getToken();
    if (!token) {
      alert('You must login as recruiter to post jobs');
      this.router.navigate(['/login']);
      return;
    }

    const jobData = {
      title: this.title,
      description: this.description,
      location: this.location,
      salary: this.salary,
      company: this.company,
      skills: this.skills.split(',').map(s => s.trim())
    };

    this.jobService.createJob(jobData,token).subscribe({
      next: (res) => {
        console.log('Job posted:', res);
        alert('Job posted successfully!');
        this.router.navigate(['/recruiter-dashboard']);
      },
      error: (err) => {
        console.error('Failed to post job:', err);
        alert('Error posting job');
      }
    });
  }
}
