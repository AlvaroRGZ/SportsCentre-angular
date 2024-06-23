import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { FirebaseAuthService } from "../firebase-auth.service";

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);

  return authService.getCurrentRole().pipe(
    map(role => {
      switch (role) {
        case "ADMIN":
          return true; // the user can access
        case "CLIENT":
          return router.createUrlTree(['/client']); // redirect to client page
        default:
          return router.createUrlTree(['/home']); // redirect to home page
      }
    }),
    catchError(() => {
      // In case of an error, navigate to a fallback page
      return of(router.createUrlTree(['/route-to-fallback-page']));
    })
  );
};
