import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { LoginData, AuthResponse, RegisterData } from '../models/auth';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl;

  user$ = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  login(data: LoginData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/auth/login`, data)
      .pipe(
        map((data: AuthResponse) => {
          this.setUser(data);
          return data;
        }),
        catchError((e: HttpErrorResponse) => {
          this.notification.error('Error', e.error.message);
          return throwError(() => e.error.message);
        })
      );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/auth/register`, data)
      .pipe(
        map((data: AuthResponse) => {
          this.setUser(data);
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
    localStorage.removeItem('currentUser');
    this.isLoggedIn$.next(false);
    this.user$.next(null);
  }

  private setUser(data: AuthResponse) {
    localStorage.setItem('feedsToken', data.accessToken);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    this.isLoggedIn$.next(true);
    this.user$.next(data.user);
  }
}
