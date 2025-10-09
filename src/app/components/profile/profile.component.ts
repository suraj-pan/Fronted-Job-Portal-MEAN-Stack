import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  profileForm!: FormGroup;
  userRole: string | null = '';
  loading = true;
  saving = false;
  message = '';
  resumeFile: File | null = null;
  resumeUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getRole();
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phone: [''],
      experience: [''],
      skills: [''],
    });
    this.loadProfile();
  }

  // ✅ Load existing profile
  loadProfile() {
    const token = this.authService.getToken();
    if (!token) {
      alert('You must log in first');
      this.router.navigate(['/login']);
      return;
    }
    this.http.get(`${environment.apiUrl}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        const user = res;
        this.resumeUrl = user.resume ? `${environment.apiUrl}/${user.resume}` : null;

        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          experience: user.experience,
          skills: user.skills?.join(', ') || ''
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading profile:', err);
        alert('Failed to load profile');
      }
    });
  }

  // ✅ Update text fields (non-file)
  updateProfile() {
    if (this.profileForm.invalid) return;

    const token = this.authService.getToken();
    const formValue = this.profileForm.getRawValue();
    const skills = formValue.skills
      ? formValue.skills.split(',').map((s: string) => s.trim())
      : [];

    this.saving = true;
    this.message = '';

    this.http.put(`${environment.apiUrl}/profile/`,
      { ...formValue, skills },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.message = '✅ Profile updated successfully!';
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => {
        this.saving = false;
        console.error('Profile update error:', err);
        alert('Error updating profile');
      }
    });
  }

  // ✅ Handle resume file change
  onResumeChange(event: any) {
    this.resumeFile = event.target.files[0];
  }

  // ✅ Upload resume
  uploadResume() {
    if (!this.resumeFile) {
      alert('Please select a file');
      return;
    }

    const token = this.authService.getToken();
    const formData = new FormData();
    formData.append('resume', this.resumeFile);

    this.http.put(`${environment.apiUrl}/profile/resume`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.message = '📄 Resume uploaded successfully!';
        this.resumeUrl = `${environment.apiUrl}/${res.user.resume}`;
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => {
        console.error('Resume upload error:', err);
        alert('Error uploading resume');
      }
    });
  }
}
