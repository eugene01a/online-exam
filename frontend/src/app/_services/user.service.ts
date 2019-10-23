import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Registration } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.authUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.authUrl}/users/` + id);
    }

    register(registration: Registration) {
        return this.http.post(`${environment.authUrl}/auth/register`, registration)
    }
    approve(registration: Registration){
      return this.http.post(`${environment.authUrl}/auth/approve`, registration)
    }

    update(user: User) {
        return this.http.put(`${environment.authUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.authUrl}/users/` + id);
    }
}
