import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorScreenPage } from './error-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorScreenPageRoutingModule {}
