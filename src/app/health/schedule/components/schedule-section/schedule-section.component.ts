import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnInit {

  @Input()
  name!: string;

  @Input()
  section!: ScheduleItem;

  @Output()
  select = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(type: string , assigned: Meal[] | Workout[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}
