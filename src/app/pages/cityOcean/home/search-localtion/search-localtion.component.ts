import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegionService } from '@cityocean/basicdata-library/region/service/region.service';
import { locationLibraryService } from '@cityocean/basicdata-library/region/service/location.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-localtion',
  templateUrl: './search-localtion.component.html',
  styleUrls: ['./search-localtion.component.scss'],
})
export class SearchlocaltionComponent implements OnInit {
  localtionList = [];
  searchText: any;
  @Input() type: string;
  private searchTerms = new Subject<string>();
  searchHistoryList: Array<any>;
  constructor(public modalController: ModalController, private locationLibraryService: locationLibraryService) {}

  ngOnInit() {
    // this.locationLibraryService.GetAllPort({Name:''}).subscribe((res:any)=>{
    //   console.log(res)
    //   this.localtionList = res.items;
    // })
    let searchHistory = JSON.parse(localStorage.getItem(this.type));
    if (searchHistory) {
      this.searchHistoryList = searchHistory;
    }
    this.searchTerms.pipe(
        // 请求防抖 100毫秒
        debounceTime(100),
      ).subscribe((text) => {
        this.locationLibraryService.GetAllPort({ Name: text }).subscribe((res: any) => {
          this.localtionList = res.items;
        });
      });
  }
  ngModelChange(event) {
    this.searchTerms.next(event);
  }

  dismissModal(item, isHistory) {
    this.modalController.dismiss({  isHistory: isHistory, data: item });
  }
}
