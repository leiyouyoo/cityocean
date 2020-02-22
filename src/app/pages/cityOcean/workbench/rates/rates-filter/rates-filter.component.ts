import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SailService } from '@cityocean/basicdata-library/region/service/sail.service';

@Component({
  selector: 'app-rates-filter',
  templateUrl: './rates-filter.component.html',
  styleUrls: ['./rates-filter.component.scss'],
})
export class RatesFilterComponent implements OnInit {
  profileForm = {
    cy: 'CY',
    carrierId: 'all',
    date:'7',
  };
  carrierList = [];

  constructor(private modalController:ModalController,
    private el:ElementRef,
    private fb: FormBuilder,
    private sailService:SailService){

    }

  ngOnInit() {
    this.sailService.getCarrierList().subscribe(res=>{
      console.log(res)
      this.carrierList = res;
    })

  }
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
  shipCompanyChange(event){
    this.profileForm.carrierId = event.detail.value[0]
  }
  cyChange(event){
    this.profileForm.cy = event.detail.value
  }
  dateChange(event){
    this.profileForm.date = event.detail.value
  }
  confirm(){
   this.dismissModal(this.profileForm);
  }
}
