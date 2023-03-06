import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  user: User | null = null;

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.logoutEvent.emit();
  }

}
