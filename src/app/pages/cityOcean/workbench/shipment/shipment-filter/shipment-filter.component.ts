import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-shipment-filter',
  templateUrl: './shipment-filter.component.html',
  styleUrls: ['./shipment-filter.component.scss'],
})
export class ShipmentFilterComponent implements OnInit {
  profileForm = {
    process: ['allInProcess'],
    mode: ['air'],
    date: 'deliveryDate',
  };
  modeCopy = ['air'];
  modeShowName = this.translate.instant('Air');
  processCopy = ['allInProcess'];
  processShowName = this.translate.instant('All shipments in progess');
  processOptionList = [
    {
      name: this.translate.instant('Select all'),
      value: 'all',
    },
    {
      name: this.translate.instant('All shipments in progess'),
      value: 'allInProcess',
    },
    {
      name: this.translate.instant("At Seller 's Location"),
      value: '0',
    },
    {
      name: this.translate.instant('Origin Stop-off'),
      value: '1',
    },
    {
      name: this.translate.instant('In trainsit to departure port'),
      value: '2',
    },
    {
      name: this.translate.instant('At Departure Port'),
      value: '3',
    },
    {
      name: this.translate.instant('In trainsit to arrival port'),
      value: '4',
    },
    {
      name: this.translate.instant('At Arrival Port'),
      value: '5',
    },
    {
      name: this.translate.instant('In trainsit to final port'),
      value: '6',
    },
    {
      name: this.translate.instant('Destination Stop-Off'),
      value: '7',
    },
    {
      name: this.translate.instant('Delivered'),
      value: '8',
    },
  ];
  carrierList = [];
  constructor(private modalController: ModalController, 
    private el: ElementRef,
    private translate:TranslateService) {}

  ngOnInit() {}
  dismissModal(data?) {
    this.modalController.dismiss(data);
  }
  processOptionClick(value) {
    console.log(value);
  }
  ionViewDidEnter() {
    let select_elements = this.el.nativeElement.querySelectorAll('ion-select');
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
  injectStyles(shadowRootElement: HTMLElement, insertBeforeSelector: string, styles: string) {
    const root = shadowRootElement.shadowRoot;
    const newStyleTag = document.createElement('style');
    newStyleTag.innerHTML = styles;
    root.insertBefore(newStyleTag, root.querySelector(insertBeforeSelector));
  }
  modeChange(event) {
    this.modeCopy = cloneDeep(event.detail.value);
    switch (this.modeCopy[0]) {
      case 'all':
        this.modeShowName = this.translate.instant('shipments All');
        break;
      case 'air':
        this.modeShowName = this.translate.instant('Air');
        break;
      case 'LCL':
        this.modeShowName = this.translate.instant('Ocean LCL');
        break;
      case 'FCL':
        this.modeShowName = this.translate.instant('Ocean FCL');
        break;
      default:
        break;
    }
  }
  processChange(event) {
    this.processCopy = cloneDeep(event.detail.value);
    this.processOptionList.forEach((e) => {
      if (e.value == this.processCopy[0]) {
        this.processShowName = e.name;
      }
    });
  }
  dateChange(event) {
    this.profileForm.date = event.detail.value;
  }
  confirm() {
    let params = {
      freightMethodType: [],
      shipmentType: [],
    };
    let hasAllInProcess = this.processCopy.some((e) => {
      return e === 'allInProcess';
    });
    this.processCopy = this.processCopy.filter((e) => {
      return e !== 'allInProcess';
    });
    if (hasAllInProcess) {
      this.processCopy = this.processCopy.concat(['0', '1', '2', '3', '4', '5', '6', '7']);
    }
    params['status'] = Array.from(new Set(this.processCopy));

    this.profileForm.mode.forEach((e) => {
      switch (e) {
        case 'air':
          params.freightMethodType.push(2);
          break;
        case 'LCL':
          params.freightMethodType.push(1);
          params.shipmentType.push(1);
          break;
        case 'FCL':
          params.freightMethodType.push(1);
          params.shipmentType.push(0);
          break;
        default:
          break;
      }
    });
    params.freightMethodType = Array.from(new Set(params.freightMethodType));
    if (this.profileForm.date) {
      params['sorting'] = this.profileForm.date;
    }
    if (params.freightMethodType.length === 0) {
      delete params.freightMethodType;
    }
    if (params.shipmentType.length === 0) {
      delete params.shipmentType;
    }
    this.dismissModal(params);
  }
}
