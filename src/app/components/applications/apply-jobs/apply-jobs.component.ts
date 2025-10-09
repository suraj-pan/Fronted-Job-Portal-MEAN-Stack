import {Component, OnInit} from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";
@Component({
  selector: 'app-apply-jobs',
  standalone: true,
  imports: [
    FormsModule,CommonModule,NavbarComponent
  ],
  templateUrl: './apply-jobs.component.html',
  styleUrl: './apply-jobs.component.css'
})
export class ApplyJobsComponent implements OnInit {
  jobId: string = '';
  file: File | null = null;
  coverLetter: string = '';

  // ✅ Notification state
  notification: { type: 'success' | 'error'; message: string } | null = null;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id') || '';
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  apply() {
    if (!this.file) {
      this.showNotification('error', 'Please upload your resume');
      return;
    }

    const formData = new FormData();
    formData.append('resume', this.file);
    formData.append('coverLetter', this.coverLetter);

    const token = this.authService.getToken();
    if (!token) {
      this.showNotification('error', 'You must be logged in to apply');
      return;
    }

    this.applicationService.applyToJob(this.jobId, formData).subscribe({
      next: (res) => {
        console.log('Application submitted:', res);
        this.showNotification('success', 'Application submitted successfully!');
        setTimeout(() => this.router.navigate(['/jobs']), 2000); // redirect after 2s
      },
      error: (err) => {
        console.error('Error applying:', err);
        this.showNotification('error', 'Failed to apply. Try again.');
      }
    });
  }

  private showNotification(type: 'success' | 'error', message: string) {
    this.notification = { type, message };
    setTimeout(() => {
      this.notification = null; // auto-hide after 3s
    }, 3000);
  }
}
