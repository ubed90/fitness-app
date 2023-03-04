import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, filter, map, of, tap } from 'rxjs';
import { AuthService, User } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'store';


export interface Meal {
  name: string,
  ingredients: string[],
  timestamp?: number,
  $key?: string,
  $exists?: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]>;

  constructor(private store:Store, private db: AngularFireDatabase, private authService: AuthService) {
    // this.meals$ = this.db.list<Meal>(`meals/${this.uid}`).valueChanges().pipe(
    //   tap(
    //     next => {
    //       this.store.set('meals', next)
    //     }
    //   )
    // )

    this.meals$ = this.db.object<{ [key: string]: Meal }>(`meals/${this.uid}`).snapshotChanges().pipe(
      map((changes) => {
        const meals: Meal[] = [];
        const data = changes.payload.val();
        if(!data) {
          this.store.set('meals', meals);
          return meals;
        }

        Object.keys(data).forEach((key) => {
          meals.push({
            ...data[key],
            $key: key
          })
        })

        this.store.set('meals', meals)
        return meals;
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

  addMeal(meal: Meal) {
    return this.db.list<Meal>(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

  getMeal(key: string) {
    if(!key) {
      return of({})
    }

    return this.store.select<Meal[]>('meals').pipe(
      filter(meals => meals.length > 0),
      map(meals => meals.find((meal: Meal) => meal.$key === key))
    )
  }


  // async uid() {
  //   const user = await this.authService.user;
  //   return user?.uid;
  // }
}
