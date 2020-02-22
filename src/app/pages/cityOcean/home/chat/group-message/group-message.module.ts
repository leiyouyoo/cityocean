import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupMessagePageRoutingModule } from './group-message-routing.module';

import { GroupMessagePage } from './group-message.page';
import { SearchConversationComponent } from './search-conversation/search-conversation.component';
import { AddMemberComponent } from './add-member/add-member.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupMessagePageRoutingModule
  ],
  declarations: [GroupMessagePage,SearchConversationComponent,AddMemberComponent],
  exports:[SearchConversationComponent,AddMemberComponent],
  entryComponents:[SearchConversationComponent,AddMemberComponent]
})
export class GroupMessagePageModule {}
