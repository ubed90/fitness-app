import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
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

  private section$ = new Subject();

  private itemList$ = new Subject();

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next))
  )

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  )

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items , section]: any[]) => {

      console.log(section , items);
      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: [],
        meals: [],
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payLoad = {
        ...(id ? section.data : defaults),
        ...items
      };

      console.log(payLoad);
      console.log(id);

      if(id) {
        delete payLoad.$key
        return this.updateSection(id, payLoad)
      }

      return this.createSection(payLoad);

    })
  )

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
      return this.getSchedule(startAt, endAt);
    }),
    map((data: any) => {
      const mapped: ScheduleList = {};

      console.log(data);
      

      for(const prop of data) {
        if(!mapped[prop.data.section]) {
          mapped[prop.data.section] = {
            $key: prop.$key,
            ...prop.data
          }
        } else {
          mapped[prop.data.section] = { ...mapped[prop.data.section], ...prop.data }
        }
      }

      console.log(mapped);
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
    }).snapshotChanges().pipe(
      map((snapshots) => {
        return snapshots.map((snapshot) => ({
          $key: snapshot.key,
          data: snapshot.payload.val()
        }))
      })
    )
  }


  selectSection(event: any) {
    this.section$.next(event)
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }


  private createSection(payLoad: ScheduleItem) {
    console.log("Create Triggered");
    return this.db.list(`schedule/${this.uid}`).push(payLoad);
  }

  private updateSection(key: string, payLoad:ScheduleItem) {
    return this.db.object<ScheduleItem>(`schedule/${this.uid}/${key}`).update(payLoad);
  }
}
