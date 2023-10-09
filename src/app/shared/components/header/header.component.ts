import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LoginData } from '../../models/auth';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
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
export class HeaderComponent implements OnInit {
  isVisible = false;
  modalType: 'login' | 'register' = 'login';
  isLoggedIn$ = new Observable<boolean>();

  @ViewChild(LoginComponent) login!: LoginComponent;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  showModal(modalType: 'login' | 'register'): void {
    this.modalType = modalType;
    this.isVisible = !this.isVisible;
  }

  onCloseModal(): void {}

  onSubmit(formData: LoginData) {
    this.login.isPending = true;
    this.authService.login(formData).subscribe(
      () => {
        this.login.isPending = false;
        this.isVisible = false;
      },
      (e) => {
        this.login.isPending = false;
      }
    );
  }
}
