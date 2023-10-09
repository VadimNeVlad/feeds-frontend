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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NzModalModule, NzButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Input() isVisible = false;
  @Output() submitted = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter();

  handleClose(): void {
    this.closeModal.emit();
  }
}
