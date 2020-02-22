import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Directive({
  selector: '[cursorPosition]',
  host: {
    '(click)': 'click($event)',
    '(keyup)': 'keyup($event)'
  }
})
export class CursorPositionDirective {
  @Output() positionChange: any = new EventEmitter<any>();
  constructor(private el: ElementRef) {
  }

  click(e: MouseEvent) {
    this.setPosition(e.target);
  }
  keyup(e: KeyboardEvent) {
    this.setPosition(e.target);
  }

  private setPosition(target: any) {
    if (target.selectionStart || target.selectionStart === 0) {
      this.positionChange.emit(target.selectionStart);
    } else {
      this.positionChange.emit(-1);
    }
  }
}

