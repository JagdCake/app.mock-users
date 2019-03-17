import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    messages: object[] = [];

    timestamp(): string {
        const currentTime = new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        return currentTime;
    }

    add(message: string): void {
        const time = this.timestamp();
        this.messages.push({time}, {body: message});
    }

    clear() {
        this.messages = [];
    }

    constructor() { }
}
