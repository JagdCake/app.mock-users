import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[noBtn]'
})
export class FocusDirective implements AfterViewInit {
    @Input() noBtn: boolean;

    constructor(private element: ElementRef) {}

    ngAfterViewInit() {
        if (this.noBtn) {
            this.element.nativeElement.focus();
        }
    }
}
