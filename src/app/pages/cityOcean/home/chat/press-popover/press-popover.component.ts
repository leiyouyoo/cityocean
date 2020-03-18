import { Component, OnInit, Output,EventEmitter, SimpleChanges,Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-press-popover',
  templateUrl: './press-popover.component.html',
  styleUrls: ['./press-popover.component.scss'],
})
export class PressPopoverComponent implements OnInit,OnChanges {
  @Output() outClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() message:any;
  constructor() { }

  ngOnInit() {
  }
  click(data){
    this.outClick.emit(data);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
}
