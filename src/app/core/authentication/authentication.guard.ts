import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Logger} from '../logger.service';
import {CredentialsService} from './credentials.service';
import { ApiService } from '../http/api.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private api: ApiService,
              private router: Router,
              private authService: CredentialsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.api.me().then(value => {
      this.authService.setUserInfo(value);
      return true;
    }).catch(() => {
      log.debug('Not authenticated, redirecting and adding redirect url...');
      this.authService.logout();
      this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
      return false;
    });
    // if (this.credentialsService.isAuthenticated()) {
    //   return true;
    // }
    //
    // this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
    // return false;
  }
}
