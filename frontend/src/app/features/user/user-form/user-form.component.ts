import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Input() isOpen = false;
}
