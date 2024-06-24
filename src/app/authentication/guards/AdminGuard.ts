import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { inject } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { FirebaseAuthService } from "../firebase-auth.service";

export const OnlyAdminsCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);
  return authService.getCurrentRole().pipe(
    map(role => {
      switch (role) {
        case "admin":
          return true;
        case "client":
          return router.createUrlTree(['/clients']);
        default:
          return router.createUrlTree(['/home']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/home']));
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => OnlyAdminsCanActivate(route, state);
