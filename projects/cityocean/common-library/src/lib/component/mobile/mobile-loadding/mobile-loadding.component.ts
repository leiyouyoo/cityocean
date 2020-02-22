import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http/http.service';

@Component({
  selector: 'mobile-loadding',
  templateUrl: './mobile-loadding.component.html',
  styleUrls: ['./mobile-loadding.component.css']
})
export class MobileLoaddingComponent implements OnInit {

  constructor(public http:HttpService) { }

  ngOnInit() {
  }
}
