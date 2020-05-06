import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPage } from './details.page';
import {TranslateModule} from '@ngx-translate/core';
import {ExpandableComponent} from '../../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  declarations: [DetailsPage, ExpandableComponent],
  entryComponents: [DetailsPage]
})
export class DetailsPageModule {}
