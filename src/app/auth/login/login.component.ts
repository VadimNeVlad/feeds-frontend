import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginData } from 'src/app/shared/models/auth';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
    NzAlertModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() isVisible = false;
  @Output() submitted = new EventEmitter<LoginData>();
  @Output() closeModal = new EventEmitter();

  isPending = false;
  passwordVisible = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit(): void {
    if (this.form.valid) this.submitted.emit(this.form.value);
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}
