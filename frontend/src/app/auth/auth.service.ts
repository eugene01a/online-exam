import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { throwError } from 'rxjs';

export class AuthService {
  constructor(private http: HttpClient) {
  }
  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }
  private BASE_URL: string = 'http://localhost:5000/auth';

  login(user): Promise<any> {
    const httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json'
       })
     };
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, httpOptions).toPromise();
  }

  register(user): Promise<any> {
    const httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json'
       })
     };
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, httpOptions).toPromise();
  }




}
