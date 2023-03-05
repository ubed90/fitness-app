import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss']
})
export class ScheduleDaysComponent implements OnInit {

  days: string[] = ['M','T','W','T','F','S','S']

  @Input()
  selected!: number;

  @Output()
  select = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  selectDay(index: number) {
    this.select.emit(index);
  }

}
