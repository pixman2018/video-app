import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { UserInterface } from './../../shared/model/user-interface';
import { UserService } from './../../shared/service/user.service';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

const CURRENT_USER = 'currentUser';
@Component({
  selector: 'fk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  user: UserInterface;
  login: boolean = false;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.user = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged( firebaseUser => {
      if (firebaseUser) {
        console.log('New: ', firebaseUser);
        this.login = true;
      } else {
        console.log('Not logged in');
        this.login = false;
      }
    });
  }

  onSubmitLogin( form ) {
    
    const promise = this.userService.login( form.email, form.password );
    const observable = from(promise);
    observable.subscribe( (res)=>  {
      sessionStorage.setItem(CURRENT_USER, res.user.uid);
      const queryParams = this.route.snapshot.queryParams;
      const redirect = queryParams['redirect'] || '/';
      this.router.navigateByUrl(decodeURI(redirect));
      // frank@web.de
    });
    promise.catch( error => console.error (error.message) );
    
  }

  signUp( form ) {
    // TODO: check 4 real email
    const promise = this.userService.signUp(form.email, form.password);
    promise
      // .then( user => console.log(user))
      .catch(e => console.error(e.message));   
  }

  

}
