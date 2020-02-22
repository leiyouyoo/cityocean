import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-conversation',
  templateUrl: './search-conversation.component.html',
  styleUrls: ['./search-conversation.component.scss'],
})
export class SearchConversationComponent implements OnInit {
  items: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }
  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
