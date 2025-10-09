import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";

// auth/register/register.component.ts
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['jobseeker', Validators.required]
    });
  }

  ngOnInit() {

  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        console.log('Registered:', res);
        this.authService.saveToken(res);
        this.router.navigate(['/jobs']); // redirect after register
      },
      error: (err) => {
        console.error('Register failed:', err);
        alert('Registration failed, try again.');
        this.isSubmitting = false;
      }
    });
  }
}
