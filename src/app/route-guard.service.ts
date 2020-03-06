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
    let savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    let canAutoLogin = false;
    if (savedUser && savedUser.time) {
      const loginTime = moment(savedUser.time).subtract(1, 'days').format('YYYY-MM-DD');
      const threeMonthLater = moment(savedUser.time)
        .add(3, 'months')
        .format('YYYY-MM-DD');
      const today = moment(new Date()).format('YYYY-MM-DD');
      canAutoLogin = moment(today).isBetween(loginTime, threeMonthLater);
    }
    if (canAutoLogin) {
      this.loginService.login(savedUser.username, savedUser.password, 4, true).then((res: any) => {
        // 极光推送绑定
        this.loginService.onSetJpush();
        if (res.access_token) {
          localStorage.setItem('isLoginWithTourist', 'false');
          this.router.navigateByUrl('/cityOcean', { replaceUrl: true });
          return false;
        }
      });
    } else {
      return true;
    }
  }
}
