import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {

  toggled = false;
  exists = false;

  @Input()
  workout!: Workout;

  @Output()
  create = new EventEmitter<Workout>()

  @Output()
  update = new EventEmitter<Workout>()

  @Output()
  remove = new EventEmitter<Workout>()


  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      sets: 0,
      reps: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  })

  constructor(private fb: FormBuilder) { }

  get placeholder() {
    return `e.g. ${this.form.get('type')?.value === 'strength' ? 'Benchpress' : 'Treadmill'}`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.workout && this.workout.name) {
      this.exists = true;

      const value  = this.workout

      this.form.patchValue(value);
    }
  }

  ngOnInit(): void {
  }

  get required() {
    return (
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    );
  }

  createWorkout() {
    if(this.form.valid) {
      this.create.emit({
        name: this.form.value.name as string,
        type: this.form.value.type as string,
        strength: this.form.value.strength,
        endurance: this.form.value.endurance
      })
    }
  }

  updateWorkout() {
    if(this.form.valid) {
      this.update.emit({
        name: this.form.value.name as string,
        type: this.form.value.type as string,
        strength: this.form.value.strength,
        endurance: this.form.value.endurance
      })
    }
  }

  removeWorkout() {
    this.remove.emit(this.workout)
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  // emptyIngredients() {
  //   while(this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }

}
