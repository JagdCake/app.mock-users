import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { User } from './user';
import { privateEnv } from '../environments/environment.private';
import { MessagesService } from './messages.service';

// const httpOptions = {
    // headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        // 'X-AUTH-TOKEN': privateEnv.apiKey
    // }),
    // observe: 'response',
// };

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

    private usersUrl = 'http://localhost:8000/mock_users';

    private handleError<T>(runAway = false, message = 'Something happened', newResult ?: T) {
        return (error: any): Observable<T> => {
            console.error(error.message);

            this.messageService.log('error', message);

            if (!runAway) {
                return of(newResult as T);
            } else {
                this.router.navigateByUrl('/');
            }
        };
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl, headersGet)
            .pipe(
                tap((_) => this.messageService.log('success', 'Found all users')),
                retry(2),
                catchError(this.handleError(false, 'Could not find all users', placeholderUsers))
            );
    }

    getUser(userId: number): Observable<User> {
        const url = `${this.usersUrl}/${userId}`;

        return this.http.get<User>(url, headersGet)
            .pipe(
                tap((_) => this.messageService.log('success', 'User found')),
                retry(2),
                catchError(this.handleError(true, 'User not found', placeholderUsers[0]))
            );
    }

    addUser(user: User): Observable<HttpResponse<object>> {
        return this.http.post<HttpResponse<object>>(this.usersUrl, user, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': privateEnv.apiKey
            }),
                observe: 'response',
            })
            .pipe(
                tap((_) => this.messageService.log('success', 'Added a new user')),
                catchError(this.handleError<HttpResponse<object>>(false, 'Could not add user'))
            );
    }

    editUser(userId: number, user: User): Observable<HttpResponse<object>> {
        const url = `${this.usersUrl}/${userId}`;

        return this.http.put<HttpResponse<object>>(url, user, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': privateEnv.apiKey
            }),
                observe: 'response',
            })
            .pipe(
                tap((_) => this.messageService.log('success', 'Updated user')),
                catchError(this.handleError<HttpResponse<object>>(false, 'Could not update user'))
            );
    }

    deleteUser(userId: number): Observable<HttpResponse<object>> {
        const url = `${this.usersUrl}/${userId}/`;

        return this.http.delete<HttpResponse<object>>(url, {headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': privateEnv.apiKey
            }),
                observe: 'response',
            })
            .pipe(
                tap((_) => this.messageService.log('success', 'User deleted')),
                catchError(this.handleError<HttpResponse<object>>(false, 'Could not delete user'))
            );
    }

    constructor(
        private http: HttpClient,
        private router: Router,
        private messageService: MessagesService
    ) {
    }
}
