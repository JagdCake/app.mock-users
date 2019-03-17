import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    errorMessages: object[] = [];
    successMessages: object[] = [];

    timestamp(): string {
        const currentTime = new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        return currentTime;
    }

    add(msgType: string, message: string): void {
        const time = this.timestamp();

        this[`${msgType}Messages`].push({time}, {body: message});
    }

    clear() {
        this.messages = [];
    }

    constructor() { }
}
