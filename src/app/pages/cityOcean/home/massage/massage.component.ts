import { Component, OnInit, Input } from '@angular/core';
import { CityOceanService } from '../../city-ocean.service';

@Component({
  selector: 'app-massage',
  templateUrl: './massage.component.html',
  styleUrls: ['./massage.component.scss'],
})
export class MassageComponent implements OnInit {
  @Input() detail :any ={typle:''};
  constructor(private cityOceanService:CityOceanService) { }

  ngOnInit() {}
  showLabel():boolean{
    return this.detail.type == 'booking' || this.detail.type == 'order' || this.detail.type == 'quote' || 
    this.detail.type == 'billing' ||  this.detail.type == 'shipment'
  }
  // 格式化显示时间
  getImtime(time){
    return this.cityOceanService.getImChatTime(time * 1000, 'HH:mm')
  }
}
