import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { inject } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { FirebaseAuthService } from "../firebase-auth.service";

export const UsersCantActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);
  return authService.getCurrentRole().pipe(
    map(role => {
      switch (role) {
        case "client":
          return true;
        case "admin":
          return router.createUrlTree(['/administration']);
        default:
          return router.createUrlTree(['/home']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/home']));
    })
  );
};
