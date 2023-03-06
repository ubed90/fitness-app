import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  user$!: Observable<User>;
  userSubscription!: Subscription;

  constructor(private store: Store, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async onLogout() {
    try {
      await this.authService.logoutUser();
      this.router.navigate(['/auth/login'])
    } catch (error : any) {
      console.log(error.message);
    }
  }
}
