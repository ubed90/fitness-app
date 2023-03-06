import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts$!: Observable<Workout[]>;
  workoutsSubscription!: Subscription;

  constructor(private workoutservice: WorkoutsService, private store: Store) { }

  ngOnInit(): void {
    this.workoutsSubscription = this.workoutservice.workouts$.subscribe();
    this.workouts$ = this.store.select('workouts');
  }

  ngOnDestroy(): void {
    if(this.workoutsSubscription) {
      this.workoutsSubscription.unsubscribe();
    }
  }

  async removeWorkout(workout: Workout) {
    await this.workoutservice.removeWorkout(workout.$key as string);
  }

}
