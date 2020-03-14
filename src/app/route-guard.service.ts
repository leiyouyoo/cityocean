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
    const savedUser = JSON.parse(localStorage.getItem('autocompletePassword'));
    const Open = window.localStorage.getItem('guideShow');
    if (savedUser || Open) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }
}
