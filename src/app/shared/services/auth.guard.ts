import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from "@angular/common";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = JSON.parse(localStorage.getItem('user') as string);

      if (user && route.url[0].path !== 'login' && route.url[0].path !== 'signup') {
        return true;
      } else if (!user && (route.url[0].path === 'login' || route.url[0].path === 'signup')) {
        return true;
      } else if (!user && (route.url[0].path !== 'login' && route.url[0].path !== 'signup')) {
        this.router.navigate(['/login'])
        return true;
      }else if (user && (route.url[0].path === 'login' || route.url[0].path === 'signup')) {
        this.router.navigate(['/main'])
        return true;
      }
      return false;
  }

}
