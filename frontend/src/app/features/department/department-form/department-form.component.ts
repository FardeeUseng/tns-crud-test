import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-department-form',
  imports: [ModalComponent],
  templateUrl: './department-form.component.html',
})
export class DepartmentFormComponent {
  @Input() isOpen = false;
}
