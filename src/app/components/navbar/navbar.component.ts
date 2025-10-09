import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userRole: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.userRole = this.authService.getRole(); // 🔹 get role from localStorage
  }

  goHome() {
    if (this.userRole === 'recruiter') {
      this.router.navigate(['/recruiter-dashboard']);
    } else {
      this.router.navigate(['/jobseeker-dashboard']);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
