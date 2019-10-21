import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient,
              ) {
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.authUrl}/auth/login`, {email: email, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.auth_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }))
  }

  status() {
    return this.http.get<any>(`${environment.authUrl}/auth/status`).pipe(map(response => {
      if (response.status == 'success') {
        return true
      }
      return false;
    }))
  }

  logout() {
    return this.http.post<any>(`${environment.authUrl}/auth/logout`, {}).pipe(map(response => {
      if (response.status == 'success') {
        localStorage.removeItem('currentUser');
        return true;
      }
      return false;
    }))
    // remove user from local storage to log user out
  }
}

