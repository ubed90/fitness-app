import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { tap } from 'rxjs';
import { Store } from 'store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  auth$ = this.af.authState.pipe(
    tap(
      next => {
        if(!next) {
          this.store.set('user', null);
          return;
        }

        const user: User = {
          email: next?.email as string,
          uid: next?.uid as string,
          authenticated: true
        };
        this.store.set('user', user);
      }
    )
  )

  constructor(private af: AngularFireAuth, private store: Store) { }

  get authState() {
    return this.af.authState;
  }

  get user() {
    return this.af.currentUser;
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password)
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.signOut();
  }
}
