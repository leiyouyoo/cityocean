import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss'],
})
export class MassageComponent implements OnInit {
  @Input() detail :any ={typle:''};
  constructor() { }

  ngOnInit() {}
  showLabel():boolean{
    return this.detail.type == 'booking' || this.detail.type == 'order' || this.detail.type == 'quote' || 
    this.detail.type == 'billing' ||  this.detail.type == 'shipment'
  }
}
