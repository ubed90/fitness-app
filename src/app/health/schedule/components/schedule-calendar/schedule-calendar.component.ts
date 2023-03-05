import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit {

  selectedDay!: Date;

  @Input()
  set date(date: Date | null) {
    if(date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  @Output()
  change = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    console.log("Offset Calculated Date:: "+startOfWeek);

    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );

    console.log("Offset Calculated Start Date:: "+startDate);

    startDate.setDate(startDate.getDate() + (weekOffset * 7));

    console.log("Offset Applied Start Date:: "+startDate);

    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    console.log("Current Day Number in Week:: "+day);
    const dayOfMonth = date.getDate();
    console.log("Current Day Number in Month:: "+dayOfMonth);
    const diff = dayOfMonth - day + (day === 0 ? -6 : 1);
    console.log("Date for Next / Prev Monday:: "+diff);
    return new Date(date.setDate(diff));
  }

}
