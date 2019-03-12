import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private usersUrl = 'http://127.0.0.1:8000/mock_users';

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    constructor(private http: HttpClient) { }
}
