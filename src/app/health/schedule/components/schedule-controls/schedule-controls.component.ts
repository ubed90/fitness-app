import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {

  offset = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }

}
