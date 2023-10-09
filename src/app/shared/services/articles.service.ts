import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, catchError, throwError } from 'rxjs';
import { Article } from '../models/article';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this._baseUrl}/articles`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.notification.error('Error', e.error.message);
        return throwError(() => e.error.message);
      })
    );
  }
}
