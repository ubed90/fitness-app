import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { Store } from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {


  meals$!: Observable<Meal[]>;
  mealsSubscription!: Subscription;

  constructor(private mealService: MealsService, private store: Store) { }

  ngOnInit(): void {
    this.mealsSubscription = this.mealService.meals$.subscribe();
    this.meals$ = this.store.select('meals');
  }

  ngOnDestroy(): void {
    if(this.mealsSubscription) {
      this.mealsSubscription.unsubscribe();
    }
  }

  async removeMeal(meal: Meal) {
    await this.mealService.removeMeal(meal.$key as string);
  }

}
