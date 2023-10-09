import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LoginData, RegisterData } from '../../models/auth';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthService } from '../../services/auth.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    RouterLink,
    NzModalModule,
    LoginComponent,
    RegisterComponent,
    NzAvatarModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isVisible = false;
  modalType: 'login' | 'register' = 'login';
  isLoggedIn$ = new Observable<boolean>();

  unsubscribe$ = new Subject<void>();

  @ViewChild(LoginComponent) login!: LoginComponent;
  @ViewChild(RegisterComponent) register!: RegisterComponent;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showModal(modalType: 'login' | 'register'): void {
    this.modalType = modalType;
    this.isVisible = !this.isVisible;
  }

  onCloseModal(): void {
    this.isVisible = false;
  }

  onSubmitLogin(formData: LoginData): void {
    this.login.isPending = true;
    this.authService
      .login(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.login.isPending = false;
          this.isVisible = false;
        },
        error: (e) => {
          this.login.isPending = false;
        },
      });
  }

  onSubmitRegister(formData: RegisterData) {
    this.register.isPending = true;
    this.authService
      .register(formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.register.isPending = false;
          this.isVisible = false;
        },

        error: (e) => {
          this.register.isPending = false;
        },
      });
  }
}
