import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent implements OnInit {

  // To change Date whether to go in Past or Future.
  // Will be 0 when it's today's date
  // Example for yesterday, It will be -1 and Tomorrow it will be +1, It will determine how many days to go back and forth
  offset = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  // Local State which will emit how many days to go back and forth
  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }

}
