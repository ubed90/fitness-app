import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, tap } from 'rxjs';
import { AuthService, User } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';


export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]>;

  constructor(private store:Store, private db: AngularFireDatabase, private authService: AuthService) {
    this.meals$ = this.db.list<Meal>(`meals/${this.uid}`).valueChanges().pipe(
      tap(
        next => {
          this.store.set('meals', next)
        }
      )
    )
  }

  get uid() {
    let uid = '';
    this.store.select<User>('user').subscribe((data) => {
      uid = data.uid
    });
    return uid;
  }


  // async uid() {
  //   const user = await this.authService.user;
  //   return user?.uid;
  // }
}
