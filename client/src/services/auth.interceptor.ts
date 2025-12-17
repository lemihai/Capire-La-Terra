import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './login-service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('JWT_TOKEN');
  const authService = inject(AuthService);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `authorisationToken:${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If the server says "Unauthorized", force logout
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};