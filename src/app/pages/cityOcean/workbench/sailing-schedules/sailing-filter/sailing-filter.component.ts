import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sailing-filter',
  templateUrl: './sailing-filter.component.html',
  styleUrls: ['./sailing-filter.component.scss'],
})
export class SailingFilterComponent implements OnInit {
  profileForm = {
    etaetd: 'ETD',
    week: '1',
    date:'',
  };
  carrierList = [];
  constructor(private modalController:ModalController,private el:ElementRef) { }

  ngOnInit() {}
  dismissModal(data?) {
    this.modalController.dismiss(data);
  }

  ionViewDidEnter() {
    let select_elements = (this.el.nativeElement.querySelectorAll('ion-select'));
    const styles = `
    .select-text{
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0px;
      top: 0;
      display: flex;
      align-items: center;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
      .select-icon, .select-icon-inner {
        display: none;
      }
      .select-placeholder {
        color: #bfbfbf;
      }

    `;
    select_elements.forEach((element) => {
      this.injectStyles(element, '.select-icon', styles);
    });
  }
  injectStyles(
    shadowRootElement: HTMLElement,
    insertBeforeSelector: string,
    styles: string
  ) {
    const root = shadowRootElement.shadowRoot;
    const newStyleTag = document.createElement('style');
    newStyleTag.innerHTML = styles;
    root.insertBefore(newStyleTag, root.querySelector(insertBeforeSelector));
  }
  weekChange(event){
    this.profileForm.week = event.detail.value
  }
  etChange(event){
    this.profileForm.etaetd = event.detail.value
  }
  confirm(){
   this.dismissModal(this.profileForm);
  }
}
