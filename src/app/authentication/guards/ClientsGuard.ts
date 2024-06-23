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
          return true; // the user can access as a client
        case "admin":
          return router.createUrlTree(['/administration']); // Redirect admins to the admin area
        default:
          return router.createUrlTree(['/home']); // Redirect all others to the home page
      }
    }),
    catchError(() => {
      // In case of an error, navigate to a fallback page
      return of(router.createUrlTree(['/route-to-fallback-page']));
    })
  );
};
