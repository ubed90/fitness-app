import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = []

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[] | any = [];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    return [
      `../${name}/new`
    ]
  }

  toggleItem(name: string) {
    if(this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
       this.selected = [...this.selected , name];
    }
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected,
    })
  }

  cancelAssign() {
    this.cancel.emit();
  }

}
