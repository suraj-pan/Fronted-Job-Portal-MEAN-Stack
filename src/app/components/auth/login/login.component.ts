import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;

    const payload = { email: this.email, password: this.password };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Login successful:', res);


        if (res.token) {
          this.authService.saveToken(res);
          localStorage.setItem('role', res.user.role);
        }

        // ✅ Redirect based on role
        if (res.user.role === 'recruiter') {
          this.router.navigate(['/recruiter-dashboard']);
        } else {
          this.router.navigate(['/jobseeker-dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed:', err);
        alert('Invalid credentials, please register first.');
        // this.router.navigate(['/register']); // redirect if login fails
      }
    });
  }
}
