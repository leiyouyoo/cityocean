import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss'],
})
export class BusinessTypeComponent implements OnInit {
  @Input() title = {title1:'',title2:''};
  @Input() status;
  @Input() type;
  constructor() { }

  ngOnInit() {}

}
