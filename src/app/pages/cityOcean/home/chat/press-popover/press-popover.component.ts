import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-press-popover',
  templateUrl: './press-popover.component.html',
  styleUrls: ['./press-popover.component.scss'],
})
export class PressPopoverComponent implements OnInit {
  @Output() outClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
  click(data){
    this.outClick.emit(data);
  }
}
