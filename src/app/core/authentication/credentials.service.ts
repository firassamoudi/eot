import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {User} from '../../models/user';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Credentials {
  // Customize received credentials here
  user: User;
  jwt: string;
}

export const credentialsKey = 'jwt';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  // tslint:disable-next-line:variable-name
  private _credentials: Credentials | null = null;
  // tslint:disable-next-line:variable-name
  private _remember: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this._remember = !!localStorage.getItem(credentialsKey);
      const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._credentials = JSON.parse(savedCredentials);
      }
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      this._credentials = credentials || null;

      if (credentials) {
        let storage;
        if (this._remember) {
          storage = localStorage;
        } else {
          storage = remember ? localStorage : sessionStorage;
          this._remember = !!remember;
        }
        storage.setItem(credentialsKey, JSON.stringify(credentials));
      } else {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
      }
    }
  }

  setUserInfo(user: User): void {
    const storage = this._remember ? localStorage : sessionStorage;
    this._credentials.user = user;
    storage.setItem(credentialsKey, JSON.stringify(this._credentials));
  }

  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }
}
