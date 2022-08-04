import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  imageHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.imageHeaders = new HttpHeaders({'File-Upload': 'true'});
  }

  private static handleError(error: Response | any): Promise<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  me(): Promise<any> {
    return this.http.get(`${environment.serverUrl}/users/me`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getStats(): Promise<any> {
    return this.http.get(`${environment.serverUrl}/stats`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getInsights(type?: string): Promise<any> {
    return this.http.get(`${environment.serverUrl}/insights?${type ? `type=${type}` : ''}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }


  searchInsights(type?: string, keyword?: string): Promise<any> {
    return this.http.get(`${environment.serverUrl}/insights?${type ? `type=${type}` : ''}&${keyword ? `title_containss=${keyword}` : ''}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getPartners(): Promise<any> {
    return this.http.get(`${environment.serverUrl}/partners`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getOrganisations(type?: string): Promise<any> {
    return this.http.get(`${environment.serverUrl}/organizations?${type ? `type=${type}` : ''}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getOrganisationById(id: string): Promise<any> {
    return this.http.get(`${environment.serverUrl}/organizations?id=${id}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getInsightById(id: string): Promise<any> {
    return this.http.get(`${environment.serverUrl}/insights?id=${id}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  login(body: any): Promise<any> {
    return this.http.post(`${environment.serverUrl}/auth/local`, JSON.stringify(body), { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

  register(body: any): Promise<any> {
    return this.http.post(`${environment.serverUrl}/auth/local/register`, JSON.stringify(body), { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

  uploadOrganisationLogo(id: number, file: File): Promise<any> {
    const fd = new FormData();
    fd.append('files', file, file.name);
    fd.append('ref', 'organization');
    fd.append('refId', id.toString());
    fd.append('field', 'logo');
    return this.http.post(`${environment.serverUrl}/upload`, fd, { headers: this.imageHeaders })
      .toPromise()
      .catch(ApiService.handleError);
  }

  addOrganisation(body: any): Promise<any> {
    return this.http.post(`${environment.serverUrl}/organizations`, JSON.stringify(body), { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  getVoyages(): Promise<any> {
    return this.http.get(`${environment.serverUrl}/voyages`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(ApiService.handleError);
  }

  forgotPassword(body: any): Promise<any> {
    return this.http.post(`${environment.serverUrl}/auth/forgot-password`, JSON.stringify(body), { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

  resetPassword(body: any): Promise<any> {
    return this.http.post(`${environment.serverUrl}/auth/reset-password`, JSON.stringify(body), { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

  loginGoogle(token: any): Promise<any> {
    return this.http.get(`${environment.serverUrl}/auth/google/callback?access_token=${token}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

  loginFacebook(token: any): Promise<any> {
    return this.http.get(`${environment.serverUrl}/auth/facebook/callback?access_token=${token}`, { headers: {"Content-Type": "application/json"}})
      .toPromise()
      .catch(error => {
        return Promise.reject(error.error.message[0].messages[0].message);
      });
  }

}
