import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from '@cityocean/basicdata-library/region/service/sail.service';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { locationLibraryService } from '@cityocean/basicdata-library/region/service/location.service';
import { MyMessageServiceService } from '../message-service.service';
import { RegionService } from '@cityocean/basicdata-library/region/service/region.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-rates-filter',
  templateUrl: './rates-filter.component.html',
  styleUrls: ['./rates-filter.component.scss'],
})
export class RatesFilterComponent implements OnInit {
  profileForm = {
    orignPortCy: 'CY',
    orignPortId: [],
    orignLocationId: '',
    originPortSearchText: '',
    originLocatonSearchText: '',
    deliveryPortCy: 'CY',
    deliveryPortId: [],
    deliveryLocationId: '',
    deliveryPortSearchText: '',
    destinationLocationSearchText: '',
    carrierId: 'all',
    ratesValidDays: '7',
  };
  carrierList = [];
  private searchTerms = new Subject<string>();

  constructor(
    private modalController: ModalController,
    private el: ElementRef,
    private sailService: SailService,
    private popoverController: PopoverController,
    private locationLibraryService: locationLibraryService,
    private myMessageServiceService: MyMessageServiceService,
    private regionService: RegionService,
  ) {}

  ngOnInit() {
    this.sailService.getCarrierList().subscribe((res) => {
      console.log(res);
      this.carrierList = res;
    });
    this.searchTerms
      .pipe(
        // 请求防抖 100毫秒
        debounceTime(200),
      )
      .subscribe((type) => {
        if (type == 'originPortSearchText' || type == 'deliveryPortSearchText') {
          this.locationLibraryService.GetAllPort({ Name: this.profileForm[type] }).subscribe((res: any) => {
            console.log(res.items);
            this.myMessageServiceService.messageAction(res.items);
          });
        }
        if (type == 'originLocatonSearchText' || type == 'destinationLocationSearchText') {
          this.locationLibraryService
            .GetAllPort({ Name: this.profileForm[type], IsOcean: true })
            .subscribe((res: any) => {
              console.log(res);
              this.myMessageServiceService.messageAction(res.items);
            });
        }
      });
  }
  dismissModal(data?) {
    this.modalController.dismiss(data);
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
  shipCompanyChange(event) {
    this.profileForm.carrierId = event.detail.value;
  }

  orignPortCyChange(event) {
    this.profileForm.orignPortCy = event.detail.value;
  }
  deliveryPortCyChange(event) {
    this.profileForm.deliveryPortCy = event.detail.value;
  }
  dateChange(event) {
    this.profileForm.ratesValidDays = event.detail.value;
  }
  confirm() {
    let data :any = {};
    if(this.profileForm.carrierId !='all'){
      data.carrierId = this.profileForm.carrierId;
    }
    data.ratesValidDays =  this.profileForm.ratesValidDays;
    data.orignLocationId =  this.profileForm.orignLocationId;
    data.orignPortId =  this.profileForm.orignPortId;
    data.deliveryPortId =  this.profileForm.deliveryPortId;

    this.dismissModal(data);
  }
  ngModelChange(type) {
    this.searchTerms.next(type);
  }

  async showPopover(event, type) {
    if (this.profileForm[type]) {
      this.ngModelChange(type);
    }
    const popover = await this.popoverController.create({
      component: InputSearchComponent,
      showBackdrop: false,
      event: event,
      keyboardClose: false,
      backdropDismiss: true,
      cssClass: 'my-popover-input-search billing-popover',
      componentProps: { dataList: [] },
    });
    popover.onDidDismiss().then((event) => {
      if (!event.data || !event.data.name) {
        return;
      }
      this.profileForm[type] = event.data.name;
      switch (type) {
        case 'originPortSearchText':
          this.profileForm.orignPortId = [event.data.id];
          break;
        case 'originLocatonSearchText':
          this.profileForm.orignLocationId = event.data.id;
          break;
        case 'deliveryPortSearchText':
          this.profileForm.deliveryPortId = [event.data.id];
          break;
        case 'destinationLocationSearchText':
          this.profileForm.deliveryLocationId = event.data.id;
          break;
        default:
          break;
      }
    });
    await popover.present();
  }
}
