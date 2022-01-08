import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnounceDriverPage } from '../announce-driver/announce-driver.page';

import { AnnounceClientPage } from './announce-client.page';

const routes: Routes = [
  {
    path: '',
    component: AnnounceClientPage,
  },
  {
    path: '/announceDriver',
    component: AnnounceDriverPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnounceClientPageRoutingModule {}
