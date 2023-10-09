import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzAlertModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Input() isVisible = false;
  @Output() submitted = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter();

  isPending = false;
  passwordVisible = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder) {}

  handleClose(): void {
    this.closeModal.emit();
  }

  handleSubmit(): void {
    if (this.form.valid) this.submitted.emit(this.form.value);
  }
}
