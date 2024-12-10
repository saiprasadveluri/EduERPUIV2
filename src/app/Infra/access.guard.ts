import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const accessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.IsLoggedInUser())
  {
    return true;
  }
  else
  return false;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.IsVerifiedUser())
  {
    return true;
  }
  else
    return false;
};

export const featureGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  var roledata=route.data['roledata'];

  var hasPermission=authService.VerifyAccess(roledata)
  console.log(hasPermission);
  return hasPermission;
};