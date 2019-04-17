import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';

const CURRENT_USER = 'currentUser';
@Component({
  selector: 'fk-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit, OnChanges {

  isLogin: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnChanges(){
  }

  logout() {
    sessionStorage.removeItem(CURRENT_USER);
    this.userService.logout();
  }

}
