import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScheduleItem, ScheduleList } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  // Selected Day to add Workouts and Meals
  selectedDayIndex!: number;
  selectedWeek!: Date;

  // Current Day of the Week / Monday of the Current Week
  selectedDay!: Date;

  // Section for adding Workouts and Meals
  sections: { key: string, name: string }[] = [
    {
      key: 'morning',
      name: 'Morning'
    },
    {
      key: 'lunch',
      name: 'Lunch'
    },
    {
      key: 'evening',
      name: 'Evening'
    },
    {
      key: 'snacks',
      name: 'Snacks and Drinks'
    },
  ] 

  @Input()
  set date(date: Date | null) {
    if(date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  // Data From Firebase for a Partcular Date
  @Input()
  items!: ScheduleList | null;


  @Output()
  change = new EventEmitter<Date>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay))

    console.log("Selected Day Index:: "+this.selectedDayIndex);
    console.log("Selected Week:: "+this.selectedWeek);
  }

  ngOnInit(): void {
  }

  onChange(weekOffset: number) {

    // Get the Current Monday of the week
    const startOfWeek = this.getStartOfWeek(new Date());
    console.log("Offset Calculated Date:: "+startOfWeek);

    // Sets the time to 00:00:00 for the start date to go back and forth;
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );

    console.log("Offset Calculated Start Date:: "+startDate);

    // using the offset to go back and forth, If its -1, => Date + (-1 * 7(Since Week is of 7 Days)) => Date + (-7) => Date - 7
    // Which will go 7 days back to previous week.
    // Vice Versa for Future

    startDate.setDate(startDate.getDate() + (weekOffset * 7));

    console.log("Offset Applied Start Date:: "+startDate);

    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    // Getting the Day Number of the week for Current Day;
    // For Example, Monday - 1, Tuesday - 2, Sunday - 0
    const day = date.getDay();
    console.log("Current Day Number in Week:: "+day);
    
    // getting the Day Number of the month for Current Day;
    // For Example - Today is 05/03/23 then it is 5
    const dayOfMonth = date.getDate();
    console.log("Current Day Number in Month:: "+dayOfMonth);

    // We are considering week from Monday to Sunday
    // Calculating the Current Sunday of the week;
    // For Example, Today is 07/03/23 then below equation will be:: 
    // dayOfMonth  - 7, day - 2 (Since Tuesday), (day === 0 ? -6 : 1) will return 1
    // So , 7 - 2 + 1
    // If we decode the first part of the quation (7 - 2), here we are trying to get the Date of the sunday of this week. Since Numbering starts from Sonday...
    // If we substract Day Number of Month - Day Number of Week we will get the Date of Sunday. i.e 5
    // In order to get to the monday of this week we need to add 1 or substract -6 on the basis of the day.
    // Substract -6 is for sunday itself. Imagine we are runnning this code on sunday :: 05/03/23
    // Equation will be 5 - 0 (Sunday - 0) = 5
    // Since we are considering our week from Monday, inorder to get to the Monday of this week we are substracting it with -6
    /* 5 - 6 = -1 and date.setDate(-1) => This will set the date back to second last date of previous month, 
       since date.setDate(-1) sets the date back to the last date of Previous Month.
    */


      //  Since Now we have reached to The Current Monday of this week. Now we can use the offset, provided by calendar controls to go bavk and forth in time.
    const diff = dayOfMonth - day + (day === 0 ? -6 : 1);
    console.log("Date for Next / Prev Monday:: "+diff);
    return new Date(date.setDate(diff));
  }

  // Get The Current Day Index

  getToday(date: Date) {
    let today = date.getDay() - 1;
    if(today < 0) {
      today = 6;
    }

    return today;
  }

  // Set the Selected Index as the Current Date using the selected Week Local state.
  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  getSection(name: string): ScheduleItem {
    return this.items && this.items[name] || {};
  }

}
