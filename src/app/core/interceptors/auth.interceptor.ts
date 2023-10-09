import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('feedsToken');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    console.log(token);

    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 401) {
      this.authService.logout();
    }

    return throwError(() => err);
  }
}
