import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';
import { privateEnv } from '../environments/environment.private';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': privateEnv.apiKey
    }),
    observe: 'response',
};

const headersGet = {
    headers: new HttpHeaders({ 'X-AUTH-TOKEN': privateEnv.apiKey })
};

const placeholderUsers = [
    {
        id: 1,
        first_name: 'Ethelbert',
        last_name: 'Swinfon',
        age: 30,
        sex: 'Male',
    },
    {
        id: 2,
        first_name: 'Pepi',
        last_name: 'Spira',
        age: 30,
        sex: 'Female',
    }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private usersUrl = 'http://127.0.0.1:8000/mock_users';

    private handleError<T>(newResult ?: T) {
        return (error: any): Observable<T> => {
            console.error(error.message);

            return of(newResult as T);
        };
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl, headersGet)
            .pipe(
                retry(2),
                catchError(this.handleError(placeholderUsers))
            );
    }

    getUser(userId: number): Observable<User> {
        const url = `${this.usersUrl}/${userId}`;

        return this.http.get<User>(url, headersGet)
            .pipe(
                retry(2),
                catchError(this.handleError(placeholderUsers[0]))
            );
    }

    addUser(user: User): Observable<HttpResponse<object>> {
        return this.http.post<HttpResponse<object>>(this.usersUrl, user, httpOptions)
            .pipe(
                catchError(this.handleError<HttpResponse<object>>())
            );
    }

    editUser(userId: number, user: User): Observable<HttpResponse<object>> {
        const url = `${this.usersUrl}/${userId}`;

        return this.http.put<HttpResponse<object>>(url, user, httpOptions)
            .pipe(
                catchError(this.handleError<HttpResponse<object>>())
            );
    }

    deleteUser(userId: number): Observable<HttpResponse<object>> {
        const url = `${this.usersUrl}/${userId}/`;

        return this.http.delete<HttpResponse<object>>(url, httpOptions)
            .pipe(
                catchError(this.handleError<HttpResponse<object>>())
            );
    }

    constructor(private http: HttpClient) {
    }
}
