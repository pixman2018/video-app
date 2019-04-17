import { Injectable }    from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }    from 'rxjs';
import { UserService } from './../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: UserService,
              private router: Router) {
  }

  canActivate(
        routeSnapshot: ActivatedRouteSnapshot,
        routerSnapshot: RouterStateSnapshot
    ): Observable<boolean> | boolean {

    if (!this.loginService.isLoggedIn()) {
      const redirect = encodeURI(routerSnapshot.url);
      this.router.navigate(['/login'], {queryParams: {redirect: redirect}});
    }
    return true;
  }
}

// frank@web.de