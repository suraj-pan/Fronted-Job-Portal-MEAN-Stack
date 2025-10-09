import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (token) {
    return true; // ✅ allow access
  } else {
    console.warn('No token, redirecting to login...');
    router.navigate(['/login']);
    return false;
  }
};
