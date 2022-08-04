import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class MapOrganisationsResolver implements Resolve<any>{

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>{
    return this.api.getOrganisations();
  }
}
