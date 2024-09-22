import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PeriodicElement } from './tableData.model';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  private elementsSubject = new BehaviorSubject<PeriodicElement[]>(
    ELEMENT_DATA
  );
  elements$ = this.elementsSubject.asObservable();

  constructor() {}

  getElements(): Observable<PeriodicElement[]> {
    return this.elements$;
  }

  updateElement(
    index: number,
    updatedElement: PeriodicElement
  ): Observable<PeriodicElement[]> {
    const elements = this.elementsSubject.value;
    if (index >= 0 && index < elements.length) {
      elements[index] = updatedElement;
      this.elementsSubject.next(elements);
    }
    return this.elements$;
  }
}
