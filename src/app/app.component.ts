import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditRecordComponent } from './edit-record/edit-record.component';

import { PeriodicElement } from './tableData.model';
import { TableDataService } from './tableData.service';
import { RxState } from '@rx-angular/state';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    EditRecordComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RxState],
})
export class AppComponent implements OnInit {
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filterControl = new FormControl('');
  isEditingRow = false;
  editingRecord!: PeriodicElement;
  editingIndex!: number;

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    this.tableDataService.getElements().subscribe((elements) => {
      this.dataSource.data = elements;
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((filterValue) => {
        this.applyFilter(filterValue);
      });
  }

  applyFilter(filterValue: string | null): void {
    this.dataSource.filterPredicate = (
      data: PeriodicElement,
      filter: string
    ) => {
      const dataStr = (
        data.position +
        data.name +
        data.weight +
        data.symbol
      ).toLowerCase();
      return dataStr.includes(filter);
    };

    this.dataSource.filter = filterValue
      ? filterValue.trim().toLowerCase()
      : '';
  }

  onEditRecord(record: PeriodicElement, index: number) {
    this.isEditingRow = true;
    this.editingRecord = { ...record };
    this.editingIndex = index;
  }

  onSaveRecord({ index, record }: { index: number; record: PeriodicElement }) {
    this.tableDataService.updateElement(index, record);
    this.isEditingRow = false;
  }

  onCancelEditRecord() {
    this.isEditingRow = false;
  }
}
