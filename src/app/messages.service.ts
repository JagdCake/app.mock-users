import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

    messages: string[] = [];

    timestamp(): string {
        const currentTime = new Date().toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        return currentTime;
    }

    add(message: string): void {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }

    constructor() { }
}
