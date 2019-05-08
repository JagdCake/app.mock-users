import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    private errorMessages: object[] = [];
    private successMessages: object[] = [];

    private timestamp(): string {
        const currentTime = new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        return currentTime;
    }

    private add(msgType: string, message: string): void {
        this[`${msgType}Messages`].push({
            time: this.timestamp(),
            body: message,
        });
    }

    public log(msgType: string, message: string): void {
        if (this[`${msgType}Messages`]) {
            this.add(msgType, message);
        } else {
            console.error('Unsupported message type');
        }
    }

    private clear(msgType: string): void {
        this[`${msgType}Messages`] = [];
    }

    constructor() { }
}
