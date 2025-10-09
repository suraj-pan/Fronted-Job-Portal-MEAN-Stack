import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = localStorage.getItem('role');
  const expectedRole = route.data['expectedRole']; // ✅ read from route data

  if (userRole === expectedRole) {
    return true;
  } else {
    console.warn(`Access denied: ${expectedRole} only`);
    router.navigate(['/jobs']);
    return false;
  }
};
