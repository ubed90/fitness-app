import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, pluck } from 'rxjs/operators'
import { User } from "./app/auth/shared/services/auth/auth.service";
import { Meal } from "./app/health/shared/services/meals/meals.service";
import { Workout } from "./app/health/shared/services/workouts/workouts.service";
import { ScheduleItem } from "./app/health/shared/services/schedule/schedule.service";

export interface State {
  user: User | undefined,
  meals: Meal[] | undefined,
  date: Date | undefined,
  schedule: ScheduleItem[] | undefined,
  selected: any,
  list: any,
  workouts: Workout[] | undefined,
  [key: string]: any,
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined,
  date: undefined,
  schedule: undefined,
  selected: undefined,
  list: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(
      pluck(name)
    );
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
