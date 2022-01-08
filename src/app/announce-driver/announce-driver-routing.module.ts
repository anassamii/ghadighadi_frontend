import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnounceClientPage } from '../announce-client/announce-client.page';

import { AnnounceDriverPage } from './announce-driver.page';

const routes: Routes = [
  {
    path: '',
    component: AnnounceDriverPage,
  },
  {
    path: '/announce-client',
    component: AnnounceClientPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnounceDriverPageRoutingModule {}
