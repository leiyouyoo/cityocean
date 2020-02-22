import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formvalidation',
  templateUrl: './formvalidation.component.html',
  styleUrls: ['./formvalidation.component.scss']
})
export class FormvalidationComponent implements OnInit {

  @Input() value;
  @Input() requiredName;
  @Input() minlength;
  @Input() maxlength;

  constructor() { }
  ngOnInit() {
  }
}
