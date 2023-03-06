import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {

  toggled = false;
  exists = false;

  @Input()
  meal!: Meal;

  @Output()
  create = new EventEmitter<Meal>()

  @Output()
  update = new EventEmitter<Meal>()

  @Output()
  remove = new EventEmitter<Meal>()


  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.meal.currentValue.name) {
    //   this.exists = true;
    // }

    if(this.meal && this.meal.name) {
      this.exists = true;

      const value  = this.meal

      this.form.patchValue(value);

      this.emptyIngredients();


      if(value.ingredients) {
        for(const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
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

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  createMeal() {
    if(this.form.valid) {
      this.create.emit({
        name: this.form.value.name as string,
        ingredients: this.form.value.ingredients as string[]
      })
    }
  }

  updateMeal() {
    if(this.form.valid) {
      this.update.emit({
        name: this.form.value.name as string,
        ingredients: this.form.value.ingredients as string[]
      })
    }
  }

  removeMeal() {
    this.remove.emit(this.meal)
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

}
