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
  console.log("MIRANDO")
  return authService.getCurrentRole().pipe(
    map(role => {
      switch (role) {
        case "admin":
          return true; // the user can access
        case "client":
          console.log("clienteeeee")
          return router.createUrlTree(['/clients']);
        default:
          console.log("ROLE " + role)
          return router.createUrlTree(['/home']);
      }
    }),
    catchError(() => {
      // In case of an error, navigate to a fallback page
      return of(router.createUrlTree(['/route-to-fallback-page']));
    })
  );
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => OnlyAdminsCanActivate(route, state);