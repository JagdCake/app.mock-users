import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { User } from './user';
import { ApiResponse } from './api-response';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
        return this.http.get<User[]>(this.usersUrl)
            .pipe(
                retry(2),
                catchError(this.handleError(placeholderUsers))
            );
    }

    addUser(user: User): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.usersUrl, user, httpOptions)
            .pipe(
                catchError(this.handleError({message: 'No response from API'}))
            );
    }

    deleteUser(userId: number): Observable<ApiResponse> {
        const url = `${this.usersUrl}/${userId}/`;

        return this.http.delete<ApiResponse>(url, httpOptions)
            .pipe(
                catchError(this.handleError({message: 'No response from API'}))
            );
    }

    constructor(private http: HttpClient) {
    }
}
