import { Component } from '@angular/core';

@Component({
  selector: 'app-city-ocean',
  templateUrl: 'cityOcean.page.html',
  styleUrls: ['cityOcean.page.scss'],
})
export class CityOceanPage {
  currentTab = 'home';
  tabsList = [
    {
      tab: 'schedule',
      name: '日程',
      className: 'schedule',
    },
    {
      tab: 'workbench',
      name: '工作台',
      className: 'workbench',
    },
    {
      tab: 'home',
      name: '首页',
      className: 'home',
    },
    {
      tab: 'contacts',
      name: '联系人',
      className: 'contacts',
    },
    {
      tab: 'me',
      name: '我的',
      className: 'me',
    },
  ];
  constructor() {}
  tabsChange(event) {
    this.currentTab = event.detail.tab;
  }
}
