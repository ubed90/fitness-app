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
    type: 'strength'
  })

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.workout.currentValue.name) {
    //   this.exists = true;
    // }

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

  // get ingredients() {
  //   return this.form.get('ingredients') as FormArray;
  // }

  // addIngredient() {
  //   this.ingredients.push(new FormControl(''))
  // }

  // removeIngredient(index: number) {
  //   this.ingredients.removeAt(index);
  // }

  createWorkout() {
    // if(this.form.valid) {
    //   this.create.emit({
    //     name: this.form.value.name as string
    //   })
    // }
  }

  updateWorkout() {
    // if(this.form.valid) {
    //   this.update.emit({
    //     name: this.form.value.name as string
    //   })
    // }
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
