import { Injectable, Optional, Inject } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { map, switchMap } from 'rxjs/operators';
import { of as observableOf, Observable } from 'rxjs';

import {AUTH_ENABLED} from './../app.tokens';

const CURRENT_USER = 'currentUser';
@Injectable({
  providedIn: 'root'
})

export class UserService {



  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.uid
      }
    })
  );

  isAdmin: Observable<boolean> = this.uid.pipe(
    switchMap( uid => {
      if(!uid) {
        return observableOf(false);
      } else {
        return this.database.object<boolean>('/admin/' + uid).valueChanges();
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    @Optional() @Inject(AUTH_ENABLED) private authEnabled = false
  ) { 
  }

  login( email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp( email, password ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    // TODO: this.authEnabled error ist immer null
    return sessionStorage.getItem(CURRENT_USER) != null;
    //return !this.authEnabled || sessionStorage.getItem(CURRENT_USER) != null;
  }


}
