import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawerPage } from './drawer.page';

const routes: Routes = [
  {
    path: 'app',
    component: DrawerPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../info/info.module').then( m => m.InfoPageModule)
      },
      {
        path: 'error',
        loadChildren: () => import('../error-screen/error-screen.module').then( m => m.ErrorScreenPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/tabs'
  },
  {
    path: 'error-screen',
    loadChildren: () => import('../error-screen/error-screen.module').then( m => m.ErrorScreenPageModule)
  },
  {path: '**', redirectTo: '/error-screen'} // it handles error screen (redirect to error screen when there is an unknown path)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawerPageRoutingModule {}
