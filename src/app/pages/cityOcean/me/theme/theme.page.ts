import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@shared/localstorage';
import { Helper } from '@shared/helper';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-me-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  ThemeType: any;
  constructor(
    public actionSheetController: ActionSheetController,
    public activeRoute: ActivatedRoute,
    public helper: Helper,
    private statusBar: StatusBar
  ) {}

  ngOnInit() {
    this.initData();
  }

  /**
   * @title 初始化项目数据
   * @desc 获取列表数据
   */
  initData() {
    const theme = LocalStorage.localStorage.get('ThemeType');
    if (theme === '' || theme == null) {
      this.ThemeType = 'blue';
    } else {
      this.ThemeType = theme;
    }
  }

  onChoose(event) {
    let color;
    if (event.detail.value === 'dark') {
      document.body.classList.remove('blue');
      color = '#0d0d0d';
    } else {
      document.body.classList.remove('dark');
      color = '#3880ff';
    }
    LocalStorage.localStorage.set('ThemeType', event.detail.value);
    document.body.classList.toggle(event.detail.value, true);
  }
}
