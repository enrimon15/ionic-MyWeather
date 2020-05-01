import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {HomePageModule} from '../home/home.module';
import {DetailsPageModule} from '../details/details.module';
import {MapPageModule} from '../map/map.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    SuperTabsModule,
    HomePageModule,
    DetailsPageModule,
    MapPageModule,
    TranslateModule.forChild()
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
