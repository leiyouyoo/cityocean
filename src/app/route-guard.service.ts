import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private router: Router, public loginService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const Open = window.localStorage.getItem('guideShow');
    const savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    let canAutoLogin = false;
    if (savedUser && savedUser.time) {
      const loginTime = moment(savedUser.time)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      const threeMonthLater = moment(savedUser.time)
        .add(3, 'months')
        .format('YYYY-MM-DD');
      const today = moment(new Date()).format('YYYY-MM-DD');
      canAutoLogin = moment(today).isBetween(loginTime, threeMonthLater);
    }
    if (canAutoLogin || Open) {
      this.router.navigateByUrl('/cityOcean/home', {
        replaceUrl: true,
      });
    } else {
      return true;
    }
  }
}
