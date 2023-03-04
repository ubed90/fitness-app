import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../../services/meals/meals.service';

@Component({
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  toggled = false;

  @Input()
  item!: any;

  @Output()
  remove = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  removeItem() {
    this.remove.emit(this.item)
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
