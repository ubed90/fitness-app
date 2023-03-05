import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from 'store';

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject<Date>(new Date());

  schedule$: Observable<any> = this.date$.pipe(
    tap(next => {
      this.store.set('date', next)
    })
  )

  constructor(private store: Store) { }

  updateDate(date: Date) {
    this.date$.next(date);
  }
}
