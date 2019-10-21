import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {Exam} from './exam.model';
import { throwError } from 'rxjs';
import * as Auth0 from 'auth0-web';


@Injectable()
export class ExamsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getExams(): Observable<Exam[]> {
    return this.http
      .get < Exam[] > (`${environment.apiUrl}/exams`)
      .catch(ExamsApiService._handleError);
  }
   saveExam(exam: Exam): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({
         'Authorization': `Bearer ${Auth0.getAccessToken()}`
       })
     };
     return this.http
       .post(`${environment.apiUrl}/exams`, exam, httpOptions);
   }
}
