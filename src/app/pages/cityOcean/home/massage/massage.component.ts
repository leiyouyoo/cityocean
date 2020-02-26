import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss'],
})
export class MassageComponent implements OnInit {
  @Input() detail :any;
  constructor() { }

  ngOnInit() {}

}
