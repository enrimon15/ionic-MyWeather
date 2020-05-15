import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorScreenPageRoutingModule } from './error-screen-routing.module';

import { ErrorScreenPage } from './error-screen.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorScreenPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ErrorScreenPage]
})
export class ErrorScreenPageModule {}
