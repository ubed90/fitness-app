import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, filter, map, of, tap } from 'rxjs';
import { AuthService, User } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';


export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp?: number,
  $key?: string,
  $exists?: () => boolean
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<Workout[]>;

  constructor(private store:Store, private db: AngularFireDatabase, private authService: AuthService) {
    this.workouts$ = this.db.object<{ [key: string]: Workout }>(`workouts/${this.uid}`).snapshotChanges().pipe(
      map((changes) => {
        const workouts: Workout[] = [];
        const data = changes.payload.val();
        if(!data) {
          this.store.set('workouts', workouts);
          return workouts;
        }

        Object.keys(data).forEach((key) => {
          workouts.push({
            ...data[key],
            $key: key
          })
        })

        this.store.set('workouts', workouts)
        return workouts;
      })
    )
  }

  get uid() {
    let uid = '';
    if(uid === '') {
      this.store.select<User>('user').subscribe((data) => {
        uid = data.uid;
      });
    }
    return uid;
  }

  addWorkout(workout: Workout) {
    return this.db.list<Workout>(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }

  getWorkout(key: string) {
    if(!key) {
      return of({})
    }

    return this.store.select<Workout[]>('workouts').pipe(
      filter(workouts => workouts.length > 0),
      map(workouts => workouts.find((workout: Workout) => workout.$key === key))
    )
  }


  // async uid() {
  //   const user = await this.authService.user;
  //   return user?.uid;
  // }
}
