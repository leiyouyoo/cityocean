import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  selectedLanguage: any;
  constructor(public translate: TranslateService, private router: Router) {}

  ngOnInit() {
    if (window.localStorage.getItem('Language')) {
      this.selectedLanguage = window.localStorage.getItem('Language');
    } else {
      this.selectedLanguage = 'en';
    }
  }

  onLanguage() {
    const lang = this.selectedLanguage;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    window.localStorage.removeItem('Language');
    window.localStorage.setItem('Language', lang);
  }
}
