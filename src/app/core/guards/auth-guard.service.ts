import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap, switchMap } from 'rxjs/operators';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._authService.user$.pipe(
        map(user => !!user),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this._router.navigate(['/login']);
          }

          return of(isLoggedIn);
        })
      );
  }
}
