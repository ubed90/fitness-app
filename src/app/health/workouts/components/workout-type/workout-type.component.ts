import { Component, forwardRef , OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const TYPE_CONTROL_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'app-workout-type',
  providers: [TYPE_CONTROL_ACCESOR],
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss']
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value: string = '';

  private onTouch: Function = () => {};

  private onModelChange: Function = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }

}
