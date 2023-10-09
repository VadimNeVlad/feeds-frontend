import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginData, LoginResponse } from '../models/auth';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl;

  isLoggedIn$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  login(data: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this._baseUrl}/auth/login`, data)
      .pipe(
        map((data: LoginResponse) => {
          localStorage.setItem('feedsToken', data.accessToken);
          this.isLoggedIn$.next(true);
          return data;
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error('Error', e.error.message);
          return throwError(() => e.error.message);
        })
      );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/user`);
  }

  logout(): void {
    localStorage.removeItem('feedsToken');
    this.isLoggedIn$.next(false);
  }
}
