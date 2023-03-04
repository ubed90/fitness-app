import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$!: Observable<any>;
  workoutsSubscription!: Subscription;

  constructor(private workoutsService: WorkoutsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workoutsSubscription = this.workoutsService.workouts$.subscribe((workouts) => {
      this.workout$ = this.route.params.pipe(
        switchMap((params: Params) => {
          return this.workoutsService.getWorkout(params.id);
        })
      )

      // this.workout$ = this.route.params.pipe(
      //   switchMap((params: Params) => {
      //     return of(workouts.find(workout => workout.$key === params.id) as workout)
      //   })
      // )
    });
  }

  ngOnDestroy(): void {
    if(this.workoutsSubscription) {
      this.workoutsSubscription.unsubscribe();
    }
  }

  async addworkout(event: Workout) {
    await this.workoutsService.addWorkout(event);

    this.backToWorkouts();
  }

  async updateworkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeworkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts'])
  }

}
