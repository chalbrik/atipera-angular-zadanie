import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../tableData.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-record',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-record.component.html',
  styleUrl: './edit-record.component.css',
})
export class EditRecordComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    index: number;
    record: PeriodicElement;
  }>();
  @Input() record!: PeriodicElement;
  @Input() index!: number;

  onSave() {
    this.save.emit({ index: this.index, record: this.record });
  }

  onCancel() {
    this.close.emit();
  }
}
