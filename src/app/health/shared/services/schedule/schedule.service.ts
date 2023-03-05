import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from 'src/app/auth/shared/services/auth/auth.service';


export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snakcs?: ScheduleItem,
  [key: string]: any
}

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp?: number,
  $key?: string,
  $exists?: () => boolean
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject<Date>(new Date());

  schedule$: Observable<any> = this.date$.pipe(
    tap(next => {
      this.store.set('date', next)
    }),
    map((date: Date) => {
      const startAt = (
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      ).getTime();

      const endAt = (
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      ).getTime() - 1;

      console.log(startAt , endAt);
      
      return { startAt , endAt }
    }),
    switchMap(({ startAt, endAt }: any) => {
      return this.getSchedule(startAt, endAt).valueChanges();
    }),
    map((data: any) => {
      const mapped: ScheduleList = {};

      for(const prop of data) {
        if(!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped
    }),
    tap(next => {
      this.store.set('schedule', next)
    })
  )

  constructor(private store: Store, private db: AngularFireDatabase) { }

  get uid() {
    let uid = '';
    if(uid === '') {
      this.store.select<User>('user').subscribe((data) => {
        uid = data.uid;
      });
    }
    return uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}` , (ref) => {
      return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)
    })
  }
}
