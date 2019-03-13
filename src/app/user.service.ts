import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';
import { ApiResponse } from './api-response';

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
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                retry(2),
                catchError(this.handleError([]))
            );
    }

    addUser(user: User): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.usersUrl, user, httpOptions)
            .pipe(
                catchError(this.handleError({message: 'No response from API'}))
            );
    }

    constructor(private http: HttpClient) {
    }
}
