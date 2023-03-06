import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$!: Observable<any>;
  mealsSubscription!: Subscription;

  constructor(private mealService: MealsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealsSubscription = this.mealService.meals$.subscribe((meals) => {
      this.meal$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.mealService.getMeal(params.id);
        })
      )

      // this.meal$ = this.route.params.pipe(
      //   switchMap((params: Params) => {
      //     return of(meals.find(meal => meal.$key === params.id) as Meal)
      //   })
      // )
    });
  }

  ngOnDestroy(): void {
    if(this.mealsSubscription) {
      this.mealsSubscription.unsubscribe();
    }
  }

  async addMeal(event: Meal) {
    await this.mealService.addMeal(event);

    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals'])
  }

}
