import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open: boolean = false;


  date$!: Observable<Date>;

  schedule$!: Observable<ScheduleItem[]>;

  selected$!: Observable<any>;

  list$!: Observable<Meal[] | Workout[]>;

  subscriptions!: Subscription[];

  constructor(
    private scheduleService: ScheduleService, 
    private store: Store,
    private mealService: MealsService,
    private workoutService: WorkoutsService
  ) { }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe(),
    ]
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    console.log(event);
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }


  closeAssign() {
    this.open = false;
  }

}
