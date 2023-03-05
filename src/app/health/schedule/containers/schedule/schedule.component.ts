import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { ScheduleItem, ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {


  date$!: Observable<Date>;

  schedule$!: Observable<ScheduleItem[]>;

  subscriptions!: Subscription[];

  constructor(private scheduleService: ScheduleService, private store: Store) { }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe()
    ]
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

}
